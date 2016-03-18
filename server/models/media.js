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
  // SQL Query > Insert Data
  pg.raw(
    `INSERT INTO media (user_id, url_small, url_medium, url_large, title, description) 
    values(
      ${photoData.user}, 
      '${photoData.url_small}',
      'null',
      'null',
      '${photoData.title}', 
      '${photoData.description}') 
    RETURNING id`
  )
  .then(function(data){
    console.log("Successfully uploaded data to PG";
    cb(null, data);
  })
  .catch((err) => {
    console.log("Error uploading data to PostgreSQL", err);
  });
};

exports.uploadToS3 = function (photoId, photo) {
  var params = {
    Bucket: 'opengallery', // required 
    Key: photoId.toString(), // required
    ACL: 'public-read',
    Body: photo
  };
  s3.putObject(params, function(err, data) {
    if (err) {
      console.log("Error uploading photo: ", err);
    } else {
      console.log("Successfully uploaded photo to opengallery", data);
      return data;
    }
  }) //if using promises on invocation, cb is unnecessary
};

exports.updatePGid = function (photosURLsArr, id) {
  //array order is med, large
  //identify which record to update
  pg.raw(
    `UPDATE media (url_medium, url_large)
      values(
        '${photosURLsArr[0]}',
        '${photosURLsArr[1]}'
      )
      WHERE (id = ${id})
    `
  )      
  .then(function(data) {
    return data;
  })
  .catch(function(err) {
    console.log("Error uploading metaData to PG", err);
  });
};

exports.retrievePhotosFromPG = function () {
  // SQL Query > Insert Data
  pg.raw(
    `SELECT * FROM media
    LIMIT 20
    RETURNING *
    `
  )
};

// example of connecting to postgresql database below (will move to models later):
// var client = new pg.Client(connectionInfo);
// client.connect();
// var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
// query.on('end', function() { client.end(); });

/* Example of connecting to 'opengallery' S3 bucket and executing methods
More details here: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

var params = {
  Bucket: 'opengallery', // required 
  Key: 'TEST_KEY', // required
  ACL: 'public-read',
  Body: 'TEST_BODY'
};
s3.putObject(params, function(err, data) {
  if (err) {
    console.log("Error uploading data: ", err);
  } else {
    console.log("Successfully uploaded data to myBucket/myKey: ", data);
  }
});
*/

//example s3 function
var listBuckets = function() {
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