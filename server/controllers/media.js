const Promise = require('bluebird')
const jimp = require('jimp')
const fs = require('fs')

const Media = require('../models/media')
const MetaTags = require('../models/metatags.model')

const resizePhoto = ({ buffer, mimetype }, size, quality) => {
  return jimp.read(buffer)
  .then(image => {
    return new Promise(function(resolve, reject) {
      image.clone().resize(size, jimp.AUTO, jimp.RESIZE_BEZIER).quality(quality)
      .getBuffer(mimetype, (err, buffer) => {
        if (err) {
          console.error(`Error parsing Jimp buffer to ${mimetype}: ${err}`)
          reject(`Error parsing Jimp buffer to ${mimetype}: ${err}`)
        } else {
          resolve(buffer)
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
    user_id: 5,
    url_small: '',
    url_med: '',
    url_large: '',
    title: '',
    description: 'GOT IT'
  }

  if (req.file) {

    resizePhoto(req.file, 25, 0)
    .then( buffer => {
      responseObject.url_small = new Buffer(buffer).toString('base64')
      return resizePhoto(req.file, 800, 100)
    })
    .catch( err => {
      console.error(`Error resizing photo: ${err}`)
    })
    .then( mediumBuffer => {
      req.file.buffer_med = mediumBuffer;
      return Media.uploadToPG(req.body.user)
    })
    .catch((err) => {
      console.log('Error uploading metaData to PostgreSQL', err);
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
      res.status(201).json(responseObject);
    })
  }
};
