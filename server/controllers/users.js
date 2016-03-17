const db = require('../db/database.js');
// require some user model here
// require Q or bluebird
const jwt = require('jwt-simple');
const moment = require('moment');

const helpers = require('../config/helpers');
const comparePassword = helpers.comparePassword;
const hashPassword = helpers.hashPassword; 

const expires = moment().add(1, 'days').valueOf();
const secret = 'shhhSecret';

module.exports = {
  signUp: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    // check if user exists already. if so, send back an error
    db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    .then( (user) => {
      if ( user.rows.length > 0 ) {
        res.status(500).send({ error: 'User Already Exists' });
      } else {
        // hash the password
        return hashPassword(password)
        .then( (hashedPW) => {
          // create the user
          console.log('hashed pw', hashedPW);
          return db.raw(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPW}')`)
        })
        .then( (user) => {
          // generate a token from the username and send it back
          var token = jwt.encode({iss: username, exp: expires}, secret);
          res.send({token: token});
        })
      }
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send({error: err});
    })
  },

  signIn: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    // fetch the user and compare the password
    db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    .then( (user) => {
      var user = user.rows[0];
      return comparePassword(password, user.password);
    })
    .then( (isMatch) => {
      // isMatch is a boolean value describing whether entered PW matches saved PW
      if ( isMatch ) {
        res.send({match: true});
      } else {
        res.send({match: false});
      }
    })
  }
};













