const pg = require('../db/database')
const s3 = require('../s3/s3')
const bodyParser = require('body-parser')
const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')

//controller handles function delegation

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photo = separateData(req.body);
  Media.uploadToPG(photo.metaData, function(id){
    let resizedPhotos = resizePhoto(photo.photoRaw);
    //parse url
    Promise.map(/*
     map each photo in resizedPhotos to s3 upload function
     var urlExtension = id + key;
     Media.uploadToS3(photo, function(urlExtension){
     });
    */)
    .then(() => {
      let url = '// http://d14shq3s3khz77.cloudfront.net/' + urlExtension;
      Media.updatePGid(url) //defined above
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
  let photoObj = {
    small: '',
    medium: '',
    large: ''
  }
  //use jimp to resize original photo
    // convert each photo to buffer
    // assign each photo buffer to corresponding property
  return photoObj;
}
