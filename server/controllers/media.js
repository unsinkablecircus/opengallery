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
  Media.retrievePhotosFromPG()
  .then((photos) => {
    res.status(200).json(photos);
  })
  .catch((err) => {
    res.status(404).send();
  });
}

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  // var photo = separateData(req.body);
  // console.log("Request files line 82 of media controllers: ", req.file);
  // clone photos and turn into buffers for upload
  // var resizedPhotos = resizePhoto(photo.s3upload);
  // console.log("resizedPhotos object-boolean line 86 of media controllers: ", !!resizedPhotos);
  // update PG upload object to include small photo buffer
  // photo.PGupload.url_small = resizedPhotos.small;
  var responseObject = {
    id: null,
    user_id: 5,
    url_small: '', //resizedPhotos.small,
    url_med: '',
    url_large: '',
    title: '', // photo.PGupload.title,
    description: 'GOT IT' // photo.PGupload.description
  };
  Media.uploadToPG(req.body)
  .then((id) => {
    // console.log("Id returned from uploadToPG function line 100 of media controllers: ", id.rows[0].id);
    responseObject.id = id.rows[0].id;
    var urlExtLarge = responseObject.id + 'large';
    // var urlExtMedium = responseObject.id + 'medium';
    // responseObject.url_med = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtMedium);
    responseObject.url_large = ('http://d14shq3s3khz77.cloudfront.net/' + urlExtLarge);

    new Promise.all(
      [Media.uploadToS3(urlExtLarge, req.file.buffer)] //,
      // Media.uploadToS3(urlExtMedium, resizedPhotos.medium)
    )
    .then((url) => {
      Media.updatePGid([responseObject.url_med, responseObject.url_large], responseObject.id) // urlsArr initiated above
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

};






