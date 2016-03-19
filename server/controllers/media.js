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
    side = 25;
  }
  if (size === 'medium') {
    side = 800;
  }
  photoObj[size] = image
    .clone()
    .read(photoObj[size], function(err, image) {
      if (err) {
        console.log(`Error reading image`, err);
      } else {
        image.resize(Jimp.AUTO, side, Jimp.RESIZE_BEZIER)
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
      // cloneAndManipulate(large, readImage);
    }
  });
  return photoObj;
}
//controller handles function delegation
exports.getPhotos = function (req, res) {
  // console.log("Get all photos response", 
  Media.retrievePhotosFromPG()
  .then((photos) => {
    res.status(200).json(photos);
  })
  .catch((err) => {
    res.status(404).send();
  });
  // );
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
  // delete resizedPhotos.small;
  Media.uploadToPG(photo.PGupload, function(id){
    var urlExtLarge = id + 'large';
    var urlExtMedium = id + 'medium';
    urlsArr.push('http://d14shq3s3khz77.cloudfront.net/' + urlExtMedium);
    urlsArr.push('http://d14shq3s3khz77.cloudfront.net/' + urlExtLarge);

    new Promise.all(
      Media.uploadToS3(urlExtLarge, resizedPhotos.large),
      Media.uploadToS3(urlExtMedium, resizedPhotos.medium)
    )
    .then(() => {
      Media.updatePGid(urlsArr, id) // urlsArr initiated above
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






