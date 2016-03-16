const pg = require('../db/database')
const s3 = require('../s3/s3')
const bodyParser = require('body-parser')
const Promise = require('bluebird')
const jimp = require('jimp')

const Media = require('../models/media')



//controller handles routes
//invoke functions which write to PG

exports.uploadPhoto = function (req, res) {
  //parse data to separate photodata from photo
  var photoAll = req.body.photo;
  var photoInfo = req.body.photoInfo;
  // var photoRaw = req.body.photoRaw;
  //
  Media.uploadToPG(photoInfo, function(id){
    var url = //unsinkkableCircus url + id + size
    Media.uploadToS3(photo, function(url){
      Media.updatePGid(photoId);
    })
  })
};
