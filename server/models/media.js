const Promise = require('bluebird')
const pg = require('./../db/database')
const s3 = require('./../s3/s3')
const bodyParser = require('body-parser')
const Jimp = require("jimp")

const Media = require('../models/media')

//model handles db manipulation

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photoAll = req.body.photo;
  var photoInfo = req.body.photoInfo;
  var photoRaw = req.body.photoRaw;
  uploadToPG(photoData, function(id){
    var url = 
    uploadToS3(photo, function(url){
      updatePGid(photoId);
    })
  })
};

uploadToPG = function (photoData, res, next) {
  // Grab data from http request
  /* example data
  var data = {
    user: 3,
    url_small: 'small.url',
    url_med: 'med.url',
    url_large: 'large.url',
    title: 'myPicture',
    description: 'made with love'
  };
  */
  // SQL Query > Insert Data
  pg.raw(
    `INSERT INTO media (user_id, url_small, url_medium, url_large, title, description) 
    values(
      ${photoData.user}, 
      'null', //${photoData.url_small}
      'null', //${photoData.url_med}
      'null', //${photoData.url_large}
      '${photoData.title}', 
      '${photoData.description}') 
    RETURNING id`
  ).then(function(data) {
    next(data)
  })
  .catch(function(err) {
    next(err);
  });
};

// test function
// uploadToPG();

uploadToS3 = function (photosArr, id) {
  /*
  var params = {
    Bucket: 'opengallery', // required 
    Key: 'TEST_KEY', // required
    ACL: 'public-read',
    Body: 'TEST_BODY'
  };
  */
  var photoIdsArr = [];

  new Promise = function(resolve, reject) {
    s3.putObject(params, function small(err, url) {

    }).
    catch(function(err) {

    })
    .
  }
  s3.putObject(params, function med(err, url) {

  })
  s3.putObject(params, function large(err, url) {

  })
};

updatePGid = function (photoIdsArr) {
  //array order is small, med, large
  pg.raw(
    `UPDATE media (url_small, url_medium, url_large)
    values(
      '${photosIdArr[0]}',
      '${photosIdArr[1]}',
      '${photosIdArr[2]}',
    )
    `
  )
  .then()
  .catch();
};