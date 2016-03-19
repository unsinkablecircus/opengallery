const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')

//helper functions
const separateData = (data) => {
  //not sure how req.body will come in
  var photoData = {
    PGupload: data.photoInfo,
    s3upload: data.photoRaw
  }
  return photoData
}

const cloneAndManipulate = (size, image) => {
  //side is one dimension of photo
  var side = 0;
  if (size === 'small') {
    side = 40;
  }
  if (size === 'medium') {
    side = 200;
  }
  if (size === 'large') {
    side = 600;
  }
  photoObj[size] = image
    .clone()
    .read(photoObj[size], function(err, image) {
      if (err) {
        console.log(`Error reading image`, err);
      } else {
        image.resize(side, Jimp.AUTO, Jimp.RESIZE_BEZIER)
        .getBuffer( jimp.MIME_JPEG, 
          // convert each photo to buffer
          function(err, bufferImg) {
            if (err) {
              console.log(`Error writing ${size} image: `, err);
            } else {
              photoObj[size] = bufferImg;
            }
          }
        );
      }
    });
}

const resizePhoto = (photo) => {
  var photoObj = {
    small: '',
    medium: '',
    large: ''
  }

  //use jimp to resize original photo
  Jimp.read(photo, function (err, image) {
    if (err) {
      console.log('Error reading image: ', err);
    } else {
      // do stuff with the image (if no exception)
      cloneAndManipulate(small, readImage);
      cloneAndManipulate(medium, readImage);
      cloneAndManipulate(large, readImage);
    }
  });
  return photoObj;
}
//controller handles function delegation
exports.getPhotos = function (req, res) {
  Media.retrievePhotosFromPG(function(photos){
    res.json(photos);
  })
}

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photo = separateData(req.body);
  var urlsArr = [];
  // clone photos and turn into buffers for upload
  var resizedPhotos = resizePhoto(photo.s3upload);
  // update PG upload object to include small photo buffer
  photo.PGupload.url_small = resizedPhotos.small;
  //take out small image from 
  delete resizedPhotos.small;
  Media.uploadToPG(photo.PGupload, function(id){
    Promise.map(resizedPhotos,
      //map each photo and key in resizedPhotos to s3 upload function
      function(photo, key){
        var urlExtension = id + key;
        urlsArr.push('http://d14shq3s3khz77.cloudfront.net/' + urlExtension);
        return Media.uploadToS3(urlExtension, photo);
      }
    )
    .then((photoId) => {
      Media.updatePGid(urlsArr, photoId) // urlsArr initiated above
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log('error updating URLs to PG db', err);
      });
    }).catch((err) => {
      console.log('error uploading images to s3 db', err)
    });
  });
};






