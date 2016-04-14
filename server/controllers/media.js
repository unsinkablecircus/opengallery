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
  var newId;

  if (photo) {
    Media.uploadToPG(photoData)
    .then((id) => {
      newId = id.rows[0].id;
      responseObject.id = id.rows[0].id;
      responseObject.url_med = ('http://d14shq3s3khz77.cloudfront.net/' + responseObject.id + 'medium.jpg');
      photoData.url_medium = responseObject.url_med;
      responseObject.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + responseObject.id + 'large.jpg');
      photoData.url_large = responseObject.url_large;
      res.status(201).json(responseObject);
      photoData.s3url = ('https://s3-us-west-1.amazonaws.com/opengallery/' + responseObject.id + 'medium.jpg');

      photo.mimetype = 'image/jpeg';
      return resizePhoto(photo, 25, 0)
    })
    .then( buffer => {
      photoData.width = imageData.width;
      photoData.height = imageData.height;
      photoData.mimetype = photo.mimetype;
      photoData.url_small = new Buffer(buffer).toString('base64')

      return resizePhoto(photo, 800, 100)
    })
    .then( mediumBuffer => {
      photo.buffer_med = mediumBuffer;

      var urlExtMedium = responseObject.id + 'medium.jpg';
      var urlExtLarge = responseObject.id + 'large.jpg';

      return new Promise.all([
        Media.uploadToS3(urlExtLarge, photo.buffer), Media.uploadToS3(urlExtMedium, photo.buffer_med)
      ])
    })
    .then((url) => {
      return Media.updatePGmetaData(photoData, responseObject.id) // urlsArr initiated above
    })
    .then(() => {
      //incorporate GoogleVision API
      return GoogleVision.analyze(photoData.s3url);
    })
    .then((labels) => {
      console.log("Labels returned from GoogleVision", labels[0].labelAnnotations);

      const filteredLabels = [];
      if (labels[0].labelAnnotations !== undefined) {
        labels[0].labelAnnotations.forEach((label) => { filteredLabels.push(label.description.replace(/\s/g, ''))})
      }

      //check if google's labels are not duplicates of user's labels to prevent PG error
      const comparedLabels = filteredLabels.filter((label) => { return (photoData.metaTags.indexOf(label) < 0) })
      const labelsArray = photoData.metaTags.split(',').concat(comparedLabels);
      return MetaTags.insert(labelsArray, responseObject.id, photoData.user)
    })
    .then((tags) => {
      responseObject.tags = tags.rows;
    })
    .catch((err) => {
      console.log('Error uploading photos', err);
      Media.deletePhotoByIdPG(newId)
      .then(id => {
        console.log('Deleted temp record from DB: ', id);
      })
      .catch(err => {
        console.log('Error deleting temp records from DB: ', err);
      })
    })
  }
};

/*
*exports.updatePhoto = function (req, res) {
*  //parse request to find which fields need to be update
*  Media.updatePGmetaData(photoData, req.body.id)
*  .then( data => {
*    res.status(201).json(data)
*  })
*  .catch( err => {
*    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
*    res.status(404).send(`[Error] Failed to query meta tags in PG: ${err}`)
*  })
*}
*/
exports.deletePhotos = function (req, res) {
  //parse request to find which fields need to be update
  console.log('photos received form request body', req.body);
  Media.deletePhotoByIdPG(req.body.photos)
  .catch((err) => {
    console.log("Error deleting from PG", err);
    res.status(404).send(`[Error] Failed to delete records in PG: ${err}`);
  })
  .then(() => {
    return deletePhotoByIdS3(req.body.photos);
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to delete records from S3: ${err}`)
  })
  .then( () => {
    res.status(200).send();
  })
}
