const Promise = require('bluebird')
const pg = require('./../db/database')
const AWS = require('aws-sdk');
AWS.config.region = 'us-west-1';
const format = require('pg-format');

// const credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
// AWS.config.credentials = credentials;
// AWS.config.update({region: 'us-west-1'});

const s3 = new AWS.S3();

//model handles pg manipulation

exports.uploadToPG = function (photoData) {
  // SQL Query > Insert Data
  var user = format.literal(photoData.user);

  return pg.raw(
    `INSERT INTO media (user_id) 
    values(
      ${user}
    ) 
    RETURNING id;`
  );
};

exports.uploadToS3 = function (photoId, photo) {
  var params = {
    Bucket: 'opengallery',
    Key: photoId.toString(),
    ACL: 'public-read',
    ContentType: 'image/jpeg',
    Body: photo
  };
  return new Promise(function(resolve, reject) {
    s3.putObject(params, function(err, data) {
      console.log('Uploading to S3');
      if (err) {
        console.log('Error uploading to S3: ', err);
        reject(err);
      } else {
        console.log('Uploaded to S3: ', data);
        resolve(data);
      }
    });
  });
};

exports.updatePGmetaData = function (photoData, id) {
  //array order is med, large
  var url_small = format.literal(photoData.url_small);
  var url_medium = format.literal(photoData.url_medium);
  var url_large = format.literal(photoData.url_large);
  var title = format.literal(photoData.title);
  var description = format.literal(photoData.description);
  var width = format.literal(photoData.width);
  var height = format.literal(photoData.height);
  var mimetype = format.literal(photoData.mimetype);

  return pg.raw(
    `UPDATE media
    SET
      url_small = ${url_small},
      url_medium = ${url_medium},
      url_large = ${url_large},
      title =${title},
      description = ${description},
      width = ${width},
      height = ${height},
      mimetype = ${mimetype}
    WHERE id = ${id}
    RETURNING *
    `
  );
};

// exports.deletePhotoByIdPG = function (photos) {
//   console.log("photos inside PG function", photos);
//   return pg.raw(
//     `DELETE FROM media
//     WHERE id = ANY ('{${photos.join(',')}}'::int[])
//     RETURNING (id);
//     `
//   );
// };

exports.deletePhotoByIdPG = function (id) {
  return pg.raw(
    `DELETE FROM media
    WHERE id = ${id}
    RETURNING (id);
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