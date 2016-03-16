const pg = require('../db/database')
const s3 = require('../s3/s3')
const bodyParser = require('body-parser')
const Promise = require('bluebird')

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

//promisified w/knex
uploadToPG = function (req, res, next) {};

//need to promisify
uploadToS3 = function (photo, url, next) {
  
  /*
  var params = {
    Bucket: 'opengallery', // required 
    Key: 'TEST_KEY', // required
    ACL: 'public-read',
    Body: 'TEST_BODY' //new Buffer('...') || 'STRING_VALUE' || streamObject,
  };
  */
  s3.putObject(params, function(url) {

  })
};

//promisified w/knex
updatePGid = function (req, res, next) {};