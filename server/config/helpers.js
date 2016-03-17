var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var comparePassword = (candidatePassword, savedPassword) => {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  })
}

// takes PW, returns 
var hashPassword = (password) => {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  })
}

module.exports = {
  comparePassword,
  hashPassword
}