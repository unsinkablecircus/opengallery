const Promise = require('bluebird')
const jimp = require('jimp')
const fs = require('fs')

const Media = require('../models/media')
const MetaTags = require('../models/metatags.model')

const separateData = (data) => {
  var photoData = {
    PGupload: data.photoInfo,
    s3upload: data.photoRaw
  }
  return photoData
}

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
    url_small: '', //resizedPhotos.small
    url_med: '',
    url_large: '',
    title: '', // photo.PGupload.title
    description: 'GOT IT' // photo.PGupload.description
  }

  if (req.file) {
    req.file.mimetype = 'image/jpeg'
    resizePhoto(req.file, 25, 0)
    .then( buffer => {
      responseObject.url_small = new Buffer(buffer).toString('base64')
      return resizePhoto(req.file, 800, 0)
    })
    .then( mediumBuffer => {
      Media.uploadToPG(req.body)
      .then((id) => {
        responseObject.id = id.rows[0].id;
        var urlExtMedium = `${responseObject.id}medium`
        var urlExtLarge = `${responseObject.id}large`
        responseObject.url_med = `http://d14shq3s3khz77.cloudfront.net/${urlExtMedium}`
        responseObject.url_large = `http://d14shq3s3khz77.cloudfront.net/${urlExtLarge}`

        new Promise.all([
          Media.uploadToS3(urlExtLarge, req.file.buffer), Media.uploadToS3(urlExtMedium, mediumBuffer)
        ])
        .then((url) => {
          Media.updatePGphotoUrls([responseObject.url_med, responseObject.url_large], responseObject.id)
          .then(() => {
            res.status(201).json(responseObject);
          })
          .catch((err) => {
            console.log('error updating URLs to PG db', err);
          });
        })
        .catch((err) => {
          console.log('error uploading images to s3 db', err)
        });
      })
      .catch((err) => {
        console.log('Error uploading metaData to PostgreSQL', err);
      });
    })
    .catch( err => {
      console.error(`Error resizing photo: ${err}`)
      reject(`Error resizing photo: ${err}`)
    })
  }
};
