const helpers = require('./helpers.js');
var multer = require('multer');

var User = require('../controllers/users');
var Media = require('../controllers/media');

module.exports = function (app, express) {
  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);

  app.post('/api/user/saveChanges', User.saveChanges);

  app.get('/api/media/', Media.getPhotos);
  app.post('/api/media/upload', multer().single('artImage'), Media.uploadPhoto);

  // With react router, server needs to serve up files
  app.get('*', function (request, response){
    response.sendFile('index.html', {"root": "public"})
  })
};
