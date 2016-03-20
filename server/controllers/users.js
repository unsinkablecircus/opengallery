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
    var id;
    var email;
    var website;
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
          return db.raw(`INSERT INTO users (username, password) VALUES ('${username}', '${hashedPW}') RETURNING id, username`)
        })
        .then( (user) => {
          // generate a token from the username and send it back
          id = user.rows[0].id;
          email = users.rows[0].email;
          website = users.rows[0].website;
          const token = jwt.encode({iss: username, exp: expires}, secret);
          res.send({token: token, id: id, username: username, email: email, website: website});
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
    var id;
    var email;
    var website;
    // fetch the user and compare the password
    db.raw(`SELECT * FROM users WHERE username = '${username}'`)
    .then( (user) => {
      var user = user.rows[0];
      id = user.id;
      email = user.email;
      website = user.website;
      return comparePassword(password, user.password);
    })
    .then( (isMatch) => {
      // isMatch is a boolean value describing whether entered PW matches saved PW
      if ( isMatch ) {
        const token = jwt.encode({iss: username, exp: expires}, secret);
        res.send({match: true, token: token, id: id, username: username, email: email, website: website});
      } else {
        res.send({match: false});
      }
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send({error: err});
    })
  },

  saveChanges: function (req, res, next) {
    db.raw(`UPDATE users 
            SET username='${req.body.username}', 
                email='${req.body.email}',
                website='${req.body.website}'
            WHERE id=${req.body.id}
            RETURNING *;`)
    .then ((user) => {
      const data = user.rows[0];
      console.log('data after update: ', data);
      res.status(200).send({
        id: data.id,
        username: data.username,
        email: data.email,
        website: data.website
      });
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send({error: err});
    })
  }
};













