var helpers = require('./config/helpers.js');
// insert controllers here
var UserController = require('./users/userController.js');


module.exports = function (app, express) {
  // insert routes here
  app.post('/user/signin', UserController.signIn);
  app.post('/user/signup', UserController.signUp);
}
