var helpers = require('./helpers.js');
// insert controllers here
var UserController = require('../user/userController.js');


module.exports = function (app, express) {
  // insert routes here
  app.post('/user/signIn', UserController.signIn);
  app.post('/user/signUp', UserController.signUp);
}
