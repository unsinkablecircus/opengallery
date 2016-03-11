// require some user model here
// require Q or bluebird
var jwt = require('jwt-simple');
var helpers = require('../config/helpers');

module.exports = {
  signIn: function (req, res, next) {
    // get username and password

    // look up user in database
    // use a compare function to check if the 

  }

  signUp: function (req, res, next) {
    // get username and password

    // check db to see if username/pw is valid
      // if valid:
        // add to db
        // generate token
        // send back the token to user
  }
}