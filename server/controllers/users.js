// require some user model here
// require Q or bluebird
var jwt = require('jwt-simple');
var helpers = require('../config/helpers');
var moment = require('moment');
// when token will expire
var expires = moment().add(1, 'days').valueOf();

module.exports = {
  signIn: function (req, res, next) {
    console.log('post to signin detected');
    res.send({name: 'greetings'});
    // get username and password from req.body
    // look up user in database
    // use a compare/bcrypt function to check PW
      // if match:
        // jwt.encode(user, 'secret');
  },

  signUp: function (req, res, next) {
    // get username and password from req.body
    // check db to see if username/pw is valid
      // if valid:
        // add to db
        // jwt.encode(user, 'secret');
        // send back the token to user
  }
};