const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')
const MetaTags = require('../models/metatags.model')
const Media_MetaTags = require('../models/media_metatags')

const imageData = {};
const resizePhoto = ({ buffer, mimetype }, size, quality) => {
  return jimp.read(buffer)
  .then(image => {
    imageData.width = image.bitmap.width;
    imageData.height = image.bitmap.height;
    return new Promise(function(resolve, reject) {
      image.clone()
      .resize(size, jimp.AUTO, jimp.RESIZE_BEZIER)
      .quality(quality)
      .getBuffer(mimetype, (err, buffer) => {
        if (err) {
          console.error(`Error parsing Jimp buffer to ${mimetype}: ${err}`)
          reject(`Error parsing Jimp buffer to ${mimetype}: ${err}`)
        } else {
          resolve(buffer);
        }
      })
    })
  })
  .catch(err => {
    console.error(`Error reading image buffer: ${err}`)
    throw new Error(`Error reading image buffer: ${err}`)
  })
}

exports.getPhotos = function (req, res) {
  MetaTags.fetch(req.query)
  .then( data => {
    res.status(200).json(data)
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to query meta tags in PG: ${err}`)
  })
}

exports.uploadPhoto = function (req, res) {
  var responseObject = {
    id: null,
    url_small: '',
    url_med: '',
    url_large: ''
  }

  if (req.file) {
    req.file.mimetype = 'image/jpeg';
    resizePhoto(req.file, 25, 0)
    .then( buffer => {
      req.body.width = imageData.width;
      req.body.height = imageData.height;
      req.body.mimetype = req.file.mimetype;
      req.body.url_small = new Buffer(buffer).toString('base64')
      req.body.url_medium = '';
      req.body.url_large = '';
      responseObject.url_small = new Buffer(buffer).toString('base64')

      return resizePhoto(req.file, 800, 100)
    })
    .catch( err => {
      console.error(`Error resizing photo: ${err}`)
    })
    .then( mediumBuffer => {
      req.file.buffer_med = mediumBuffer;
      return Media.uploadToPG(req.body)
    })
    .catch((err) => {
      console.log('Error uploading images to PostgreSQL', err)
      res.status(404).json({"error": err});
    })
    .then((id) => {
      responseObject.id = id.rows[0].id;

      var urlExtMedium = responseObject.id + 'medium';
      var urlExtLarge = responseObject.id + 'large';
      responseObject.url_med = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtMedium);
      responseObject.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtLarge);

      return new Promise.all([
        Media.uploadToS3(urlExtLarge, req.file.buffer), Media.uploadToS3(urlExtMedium, req.file.buffer_med)
      ])
    })
    .catch((err) => {
      console.log('Error uploading images to s3 db', err)
      res.status(404).json({"error": err});
    })
    .then((url) => {
      return Media.updatePGphotoUrls([responseObject.url_med, responseObject.url_large], responseObject.id) // urlsArr initiated above
    })
    .catch((err) => {
      console.log('Error updating URLs to PG db', err);
      res.status(404).json({"error": err});
    })
    .then(() => {
      MetaTags.insert(req.body.tags);
    })
    .catch((err) => {
      console.log('Error uploading tags to PostgreSQL', err);
    })
    .then((tagsTables) => {
      console.log(tagsTables);
      Media_MetaTags.insert(/*req.body.tags*/, responseObject.id);
    })
    .catch((err) => {
      console.log('Error uploading media_tags to PostgreSQL', err);
    })
    .then(() => {
      res.status(201).json(responseObject);
    })
  }
};
