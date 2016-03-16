var bcrypt = require('bcrypt-nodejs');
var Q = require('q');

var comparePassword = (candidatePassword, savedPassword) => {
  return Q.promise(function(resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  })
}

var hashPassword = (password) => {
  return Q.promise(function(resolve, reject) {
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