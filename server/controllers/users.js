const db = require('../db/database.js');
// require some user model here
// require Q or bluebird
const jwt = require('jwt-simple');
const moment = require('moment');

const helpers = require('../config/helpers');
const comparePassword = helpers.comparePassword;
const hashPassword = helpers.hashPassword; 

const expires = moment().add(1, 'days').valueOf();

module.exports = {
  signUp: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    .then( (user) => {
      if ( user.rows.length > 0 ) {
        return res.status(500).send({ error: 'User Already Exists' });
      } else {
        return hashPassword(password);
      }
    })
    .then( (hashedPW) => {
        return db.raw(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPW}')`)
    })
    .then( (user) => {
      // generate a token
      console.log('user', user);
      res.send(user);
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send({error: err});
    })
  },

  signIn: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    .then( (user) => {
      var user = user.rows[0];
      return comparePassword(password, user.password);
    })
    .then( (isMatch) => {
      if ( isMatch ) {
        res.send({match: true});
      } else {
        res.send({match: false});
      }
    })
  }
};













