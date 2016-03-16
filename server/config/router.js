var helpers = require('./helpers.js');

var UserController = require('../user/userController.js');

module.exports = function (app, express) {
  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);
};