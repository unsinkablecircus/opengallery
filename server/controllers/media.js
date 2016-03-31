const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')
const MetaTags = require('../models/metatags.model')
const Media_MetaTags = require('../models/media_metaTags')

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
  const photo = req.file;
  const photoData = req.body;
  res.status(201).send();
  
  if (photo) {
    photo.mimetype = 'image/jpeg';
    resizePhoto(photo, 25, 0)
    .then( buffer => {
      photoData.width = imageData.width;
      photoData.height = imageData.height;
      photoData.mimetype = photo.mimetype;
      photoData.url_small = new Buffer(buffer).toString('base64')
      photoData.url_medium = '';
      photoData.url_large = '';
      responseObject.url_small = new Buffer(buffer).toString('base64')

      return resizePhoto(photo, 800, 100)
    })
    .catch( err => {
      console.error(`Error resizing photo: ${err}`)
    })
    .then( mediumBuffer => {
      photo.buffer_med = mediumBuffer;
      return Media.uploadToPG(photoData)
    })
    .catch((err) => {
      console.log('Error uploading images to PostgreSQL', err)
    })
    .then((id) => {
      responseObject.id = id.rows[0].id;

      var urlExtMedium = responseObject.id + 'medium.jpg';
      var urlExtLarge = responseObject.id + 'large.jpg';
      responseObject.url_med = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtMedium);
      responseObject.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtLarge);

      return new Promise.all([
        Media.uploadToS3(urlExtLarge, photo.buffer), Media.uploadToS3(urlExtMedium, photo.buffer_med)
      ])
    })
    .catch((err) => {
      console.log('Error uploading images to s3 db', err)
    })
    .then((url) => {
      return Media.updatePGphotoUrls([responseObject.url_med, responseObject.url_large], responseObject.id) // urlsArr initiated above
    })
    .catch((err) => {
      console.log('Error updating URLs to PG db', err);
    })
    .then(() => {
      if (photoData.metaTags.length > 0) {
        return MetaTags.insert(photoData.metaTags.split(','), responseObject.id);
      } else {
        return;
      }
    })
    .catch((err) => {
      console.log('Error uploading tags to PostgreSQL', err);
    })
    .then((tags) => {
      responseObject.tags = tags.rows;
    })
    .catch((err) => {
      console.log("error sending response to client", err);
    })
  }
};

exports.updatePhoto = function (req, res) {
  //parse request to find which fields need to be update
  Media.updatePGmetaData(/*photoData, req.body.id*/)
  .then( data => {
    res.status(201).json(data)
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to query meta tags in PG: ${err}`)
  })
}

exports.deletePhoto = function (req, res) {
  //parse request to find which fields need to be update
  Media.deletePhotoById(/*req.body, req.body.id*/)
  .then( () => {
    res.status(201)
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to query meta tags in PG: ${err}`)
  })
}
