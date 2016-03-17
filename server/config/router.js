var helpers = require('./helpers');

var User = require('../controllers/users');

module.exports = function (app, express) {
  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);
};
