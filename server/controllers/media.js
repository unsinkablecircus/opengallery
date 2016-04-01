const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')
const MetaTags = require('../models/metatags.model')
const GoogleVision = require('../models/vision.model')

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
    url_med: '',
    url_large: ''
  }
  const photo = req.file;
  const photoData = req.body;

  if (photo) {
    Media.uploadToPG(photoData)
    .catch((err) => {
      console.log('Error uploading images to PostgreSQL', err)
    })
    .then((id) => {
      responseObject.id = id.rows[0].id;
      responseObject.url_med = ('http://d14shq3s3khz77.cloudfront.net/' + responseObject.id + 'medium.jpg');
      responseObject.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + responseObject.id + 'large.jpg');
      res.status(201).json(responseObject);

      photo.mimetype = 'image/jpeg';
      return resizePhoto(photo, 25, 0)
    })
    .catch((err) => {
      console.log("error sending response to client", err);
    })
    .then( buffer => {
      photoData.width = imageData.width;
      photoData.height = imageData.height;
      photoData.mimetype = photo.mimetype;
      photoData.url_small = new Buffer(buffer).toString('base64')
      photoData.url_medium = '';
      photoData.url_large = '';

      return resizePhoto(photo, 800, 100)
    })
    .catch( err => {
      console.error(`Error resizing photo: ${err}`)
    })
    .then( mediumBuffer => {
      photo.buffer_med = mediumBuffer;

      var urlExtMedium = responseObject.id + 'medium.jpg';
      var urlExtLarge = responseObject.id + 'large.jpg';
      photoData.url_medium = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtMedium);
      photoData.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtLarge);

      return new Promise.all([
        Media.uploadToS3(urlExtLarge, photo.buffer), Media.uploadToS3(urlExtMedium, photo.buffer_med)
      ])
    })
    .catch((err) => {
      console.log('Error uploading images to s3 db', err)
    })
    .then((url) => {
      return Media.updatePGmetaData(photoData, responseObject.id) // urlsArr initiated above
    })
    .catch((err) => {
      console.log('Error updating URLs to PG db', err);
    })
    .then(() => {
      //incorporate GoogleVision API
      console.log("Right before invoking GoogleVision analyze function in media controller");
      return GoogleVision.analyze(photoData.url_large)
    })
    .catch(() => {
      console.error(`Error detecting labels for photo: ${err}`)
    })
    .then((labels) => {
      console.log("Labels returned from GoogleVision", labels);
      const filteredLabels = labels.labelAnnotations.map((label) => {return label.description})
      const labelsArray = photoData.metaTags.split(',').concat(filteredLabels);
      return MetaTags.insert(labelsArray, responseObject.id)
    })
    .then((tags) => {
      responseObject.tags = tags.rows;
    })
    .catch((err) => {
      console.log('Error uploading tags to PostgreSQL', err);
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
  Media.deletePhotoByIdPG(req.body.id)
  .catch((err) => {
    console.log("Error deleting from PG", err);
    res.status(404).send(`[Error] Failed to delete records in PG: ${err}`);
  })
  .then(() => {
    return deletePhotoByIdS3(req.body.id);
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to delete records from S3: ${err}`)
  })
  .then( () => {
    res.status(200).send();
  })
}
