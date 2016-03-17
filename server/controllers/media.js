const pg = require('../db/database')
const s3 = require('../s3/s3')
const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')

//controller handles function delegation

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  let photo = separateData(req.body);
  let urlsArr = [];
  Media.uploadToPG(photo.metaData, function(id){
    let resizedPhotos = resizePhoto(photo.photoRaw);
    //parse url
    Promise.map(/*
      map each photo and key in resizedPhotos to s3 upload function
      var urlExtension = id + key;
      urlsArr.push('http://d14shq3s3khz77.cloudfront.net/' + urlExtension);
      Media.uploadToS3(photo, urlExtension)
    */)
    .then(() => {
      Media.updatePGid(urlsArr) //initiated above
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

separateData (data) => {
  //
  let photoData = {
    metaData: data.photoInfo,
    raw: data.photoRaw
  }
  return photoData
}

resizePhoto (photo) => {
  let photoArr = [
    {small: ''},
    {medium: ''},
    {large: ''}
  ]

  //use jimp to resize original photo
  Jimp.read(photo, function (err, readImage) {
    if (err) {
      console.log('Error reading image: ', err);
    } else {
      // do stuff with the image (if no exception)
      cloneAndManipulate(small);
      cloneAndManipulate(medium);
      cloneAndManipulate(large);
    }
  });
  return photoArr;
}

cloneAndManipulate (size) => {
  // seemingly useful functions
    // readImage.quality( n ); // set the quality of saved JPEG, 0 - 100
    // readImage.resize(250, 250, Jimp.RESIZE_BEZIER);
    // readImage.getBuffer( mime, cb ); // Node-style callback wil be fired with result
  photoArr[size] = readImage.clone()
    .resize(###, ###, Jimp.RESIZE_BEZIER)
    // convert each photo to buffer
    .getBuffer( Jimp.MIME_JPEG, function(err, bufferImg) {
      if (err) {
        console.log(`Error writing ${size} image: `, err);
      } else {
        photoArr[size] = bufferImg;
      }
    }
  );
}


