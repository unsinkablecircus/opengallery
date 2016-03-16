const Promise = require('bluebird')
const PG = Promise.promisifyAll(require('./../db/database'))
const bodyParser = require('body-parser')

const Media = require('../models/media')

//controller handles routes

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photoAll = req.body.photo;
  uploadToPG(photoData, function(){
    uploadToS3(photo, function(){
      updatePGid(photoId)
    })
  })
};

uploadToPG = function (req, res, next) {
  var results = [];
  // Grab data from http request
  var data = {
    // user: req.body.user,
    // url_small: req.body.url_small,
    // url_med: req.body.url_med,
    // url_large: req.body.url_large,
    // title: req.body.title,
    // description: req.body.description
    user: 3,
    url_small: 'small.url',
    url_med: 'med.url',
    url_large: 'large.url',
    title: 'myMedia',
    description: 'made with love'
  };
  // SQL Query > Insert Data
  PG.raw(
    `INSERT INTO media (user_id, url_small, url_medium, url_large, title, description) 
    values(
      ${data.user}, 
      '${data.url_small}', 
      '${data.url_med}', 
      '${data.url_large}', 
      '${data.title}', 
      '${data.description}') 
    RETURNING id`
  ).then(function(data) {
    console.log(data);
    // client.raw()
  })
  .catch(function(err) {
    console.log(err);
  });

  // After all data is returned, close connection and return results
  // query.on('end', function() {
  //   done();
  //   return res.json(results);
  // });
};

//test function
uploadToPG();

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