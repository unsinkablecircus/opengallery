var helpers = require('./helpers.js');

var UserController = require('../user/userController.js');

module.exports = function (app, express) {
  app.post('/user/signIn', UserController.signIn);
  app.post('/user/signUp', UserController.signUp);
}
