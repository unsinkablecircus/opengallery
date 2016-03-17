const Promise = require('bluebird')
const pg = require('./../db/database')
const s3 = require('./../s3/s3')
const bodyParser = require('body-parser')

const Media = require('../models/media')

//model handles db manipulation

exports.uploadToPG = function (photoData, cb) {
  /* example data
  var data = {
    user: 3,
    url_small: 'null',
    url_med: 'null',
    url_large: 'null',
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
    cb(null, data)
  })
  .catch(function(err) {
    cb(err, null);
  });
};

// test function
// uploadToPG();

exports.uploadToS3 = function (photoId, photo) {
  var params = {
    Bucket: 'opengallery', // required 
    Key: photoId, // required
    ACL: 'public-read',
    Body: photo
  };
  s3.putObject(params)
};

exports.updatePGid = function (photoURLsArr) {
  //array order is small, med, large
  pg.raw(
    `UPDATE media (url_small, url_medium, url_large)
    values(
      '${photosURLsArr[0]}',
      '${photosURLsArr[1]}',
      '${photosURLsArr[2]}',
    )
    `
  )
};