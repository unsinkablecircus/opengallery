const Promise = require('bluebird')
const pg = require('./../db/database')
const AWS = require('aws-sdk');
const format = require('pg-format');
// load AWS credentials
const credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

const s3 = new AWS.S3();
// const Media = require('../models/media')

//model handles pg manipulation

exports.uploadToPG = function (photoData) {
  // SQL Query > Insert Data
  var user = format.literal(photoData.user);
  var url_small = format.literal(photoData.url_small);
  var url_medium = format.literal(photoData.url_medium);
  var url_large = format.literal(photoData.url_large)
  var title = format.literal(photoData.title);
  var description = format.literal(photoData.description);
  var width = format.literal(photoData.width);
  var height = format.literal(photoData.height);
  var mimetype = format.literal(photoData.mimetype);
  console.log(user, url_small, url_medium, url_large, title, description, width, height, mimetype)

  return pg.raw(
    `INSERT INTO media (user_id, url_small, url_medium, url_large, title, description, width, height, mimetype) 
    values(
      ${user},
      ${url_small},
      ${url_medium},
      ${url_large},
      ${title},
      ${description},
      ${width},
      ${height},
      ${mimetype}
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

exports.updatePGphotoUrls = function (photosURLsArr, id) {
  //array order is med, large
  var url_medium = format.literal(photosURLsArr[0]);
  var url_large = format.literal(photosURLsArr[1]);
  var id = format.literal(id);
  return pg.raw(
    `UPDATE media
    SET
      url_medium = '${url_medium}',
      url_large = '${url_large}'
    WHERE id = ${id}
    RETURNING *
    `
  );
};

exports.updatePGmetaData = function (photoData, id) {
  // identify which fields to update, 
    // only overwrite those
  var title = format.literal(photoData.title);
  var description = format.literal(photoData.description);
  var id = format.literal(id);
  return pg.raw(
    `UPDATE media
    SET
      title = '${title}',
      description = '${description}',
    WHERE id = ${id}
    RETURNING *
    `
  );
};

exports.deletePhotoById = function (id) {
  // identify which fields to update, 
    // only overwrite those
  var id = format.literal(id);
  return pg.raw(
    `DELETE FROM media
    WHERE id = ${id}
    `
  );
};

exports.retrievePhotos = function () {
  return pg.raw(
    `SELECT * FROM media
    LIMIT 20;
    `
  )
};