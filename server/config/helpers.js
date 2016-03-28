var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

exports.comparePassword = (candidatePassword, user) => {
  const savedPassword = user.password;
  return new Promise(function(resolve, reject) {
    console.log('comparing pw...')
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        console.log('error comparing pw');
        reject(err);
      } else {
        console.log('isMatch:', isMatch);
        resolve({isMatch: isMatch, user: user});
      }
    });
  })
}

// takes PW, returns
exports.hashPassword = (password) => {
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
