const pg import ('../db/database')
const s3 import ('../s3/s3')
const bodyParser import ('body-parser')
const Promise import ('bluebird')

const Media import ('../models/media')



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

uploadToPG = function (req, res, next) {};

//need to promisify
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

//use knex to 
updatePGid = function (req, res, next) {};