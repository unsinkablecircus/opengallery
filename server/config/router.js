var helpers = require('./helpers.js');

var User = require('../controllers/users.js');

module.exports = function (app, express) {
  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);
};