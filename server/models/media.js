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

uploadToPG = function (req, res, next) {
  var results = [];
  // Grab data from http request
  var data = {
    user: req.body.user,
    url_small: req.body.url_small,
    url_med: req.body.url_med,
    url_large: req.body.url_large,
    title: req.body.title,
    description: req.body.description
  };

  // Get a Postgres client from the connection pool
  pg.connect(function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log('failed to connect:', err);
      return res.status(500).json({ success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query(
      `INSERT INTO media(user, url_small, url_med, url_large, title, description) 
      values({$1}, {$2}, {$3}, {$4}, {$5}, {$6}) 
      RETURNING id`, 
      [
        data.user, 
        data.url_small, 
        data.url_med, 
        data.url_large, 
        data.title, 
        data.description
      ]
    ).then(function(data) {
      console.log(data);
      // client.raw()
      
    });
    // SQL Query > Select Data
    // var query = client.query(
    //   "SELECT id FROM media "
    // );

    // // Stream results back one row at a time
    // query.on('row', function(row) {
    //   results.push(row);
    // });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
};

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