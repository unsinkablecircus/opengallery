const helpers = require('./helpers.js');

var User = require('../controllers/users');
var Media = require('../controllers/media.js');

module.exports = function (app, express) {
  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);

  app.get('/api/media/', Media.getPhotos);
  app.post('/api/media/upload', Media.uploadPhoto);
};

