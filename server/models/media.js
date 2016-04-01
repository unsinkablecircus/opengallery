const Promise = require('bluebird')
const pg = require('./../db/database')
const AWS = require('aws-sdk');

// load AWS credentials
const credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

const s3 = new AWS.S3();
// const Media = require('../models/media')

//model handles pg manipulation

exports.uploadToPG = function (photoData) {
  // SQL Query > Insert Data
  return pg.raw(

    `INSERT INTO media (user_id, url_medium, url_large) 
    values(
      ${photoData.user},
      '${photoData.url_medium}',
      '${photoData.url_large}'
    ) 
    RETURNING id`
  );
};

exports.uploadToS3 = function (photoId, photo) {
  var params = {
    Bucket: 'opengallery', // required
    Key: photoId.toString(), // required
    ACL: 'public-read',
    ContentType: 'image/jpeg',
    Body: photo
  };
  return new Promise(function(resolve, reject) {
    s3.putObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.updatePGmetaData = function (photoData, id) {
  //array order is med, large
  //identify which record to update
  // return
  return pg.raw(
    `UPDATE media
    SET
      url_small = '${photoData.url_small}',
      url_medium = '${photoData.url_medium}',
      url_large = '${photoData.url_large}',
      title ='${photoData.title}',
      description = '${photoData.description}',
      width = ${photoData.width},
      height = ${photoData.height},
      mimetype = '${photoData.mimetype}'
    WHERE id = ${id}
    RETURNING *
    `
  );
};

exports.deletePhotoByIdPG = function (mediaId) {

  return pg.raw(
    `DELETE FROM media
    WHERE id = ${mediaId}
    RETURNING ${mediaId};
    `
  );
};

exports.deletePhotoByIdS3 = function (photos) {
  var photosArray = [];
  photos.forEach(function(photo) {
    photosArray.push({
      Key: photo + 'large',
    },{
      Key: photo + 'medium',
    })
  })
  var params = {
    Bucket: 'opengallery', // required
    Delete: { // required 
      Objects: photosArray // required 
    }
  };

  return new Promise(function(resolve, reject) {
    s3.deleteObjects(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject(err);
      } else {
        console.log(data);           // successful response
        resolve(data);
      }
    });
  });
};

exports.retrievePhotos = function () {
  return pg.raw(
    `SELECT * FROM media
    LIMIT 20;
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
