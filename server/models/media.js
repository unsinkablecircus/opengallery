const Promise = require('bluebird')
const pg = require('./../db/database')
const s3 = require('./../s3/s3')
const bodyParser = require('body-parser')

const Media = require('../models/media')

//model handles db manipulation

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photoAll = req.body.photo;
  var 
  uploadToPG(photoData, function(){
    uploadToS3(photo, function(){
      updatePGid(photoId)
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
      '${photoData.url_small}', 
      '${photoData.url_med}', 
      '${photoData.url_large}', 
      '${photoData.title}', 
      '${photoData.description}') 
    RETURNING id`
  ).then(function(data) {
    console.log(data);
    res.json(data)
  })
  .catch(function(err) {
    console.log(err);
  });
};

// test function
// uploadToPG();

uploadToS3 = function (req, res, next) {
  
  /*
  var params = {
    Bucket: 'opengallery', // required 
    Key: 'TEST_KEY', // required
    ACL: 'public-read',
    Body: 'TEST_BODY'
  };
  */
  s3.putObject(params, function(url) {

  })
};

updatePGid = function (req, res, next) {};