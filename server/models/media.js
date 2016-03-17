const Promise = require('bluebird')
const pg = require('./../db/database')
const AWS = require('aws-sdk');

// load AWS credentials
const credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

const s3 = new AWS.S3();
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
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log("Error uploading photo: ", photoId, err);
    } else {
      console.log("Successfully uploaded photo to opengallery", data);
    }
  }) //if using promises on invocation, cb is unnecessary
};

exports.updatePGid = function (photosURLsArr) {
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

//example s3 function
let listBuckets = function() {
  s3.listBuckets(function(err, data) {
    if (err) { console.log("Error:", err); }
    else {
      for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
        console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
      }
    }
  });
};