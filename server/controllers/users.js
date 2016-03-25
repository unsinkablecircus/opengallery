const db = require('../db/database.js');
const jwt = require('jwt-simple');
const moment = require('moment');

const helpers = require('../config/helpers');
const comparePassword = helpers.comparePassword;
const hashPassword = helpers.hashPassword; 

const expires = moment().add(1, 'days').valueOf();
const secret = 'shhhSecret';
const users = require('../models/users');

module.exports = {
  signUp: function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    var id;
    // check if user exists already. if so, send back an error
    users.findUser(username)
    .then( (user) => {
      if ( user.rows.length > 0 ) {
        res.status(500).send({ error: 'User Already Exists' });
      } else {
        // hash the password
        return hashPassword(password)
        .then( (hashedPW) => {
          // create the user
          return users.createUser(username, hashedPW)
        })
        .then( (user) => {
          // generate a token from the username and send it back
          id = user.rows[0].id;
          const token = jwt.encode({iss: username, exp: expires}, secret);
          res.send({token: token, id: id, username: username});
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
    var name;
    var email;
    var website;
    var facebook_url;
    var twitter_url;
    // fetch the user and compare the password
    users.findUser(username)
    .then( (user) => {
      var user = user.rows[0];
      id = user.id;
      name = user.name;
      email = user.email;
      website = user.website;
      facebook_url = user.facebook_url;
      twitter_url = user.twitter_url;
      return comparePassword(password, user);
    })
    .then( (data) => {
      // isMatch is a boolean value describing whether entered PW matches saved PW
      if ( data.isMatch ) {
        const token = jwt.encode({iss: username, exp: expires}, secret);
        res.send({
          match: true, 
          token: token, 
          id: id, 
          username: username,
          name: name,
          email: email, 
          website: website,
          facebook_url: facebook_url,
          twitter_url: twitter_url
        });
      } else {
        res.send({match: false});
      }
    })
    .catch((err) => {
      res.status(500).send({error: err});
    })
  },

  saveChanges: function (req, res, next) {
    var data = {
      name: req.body.name === 'undefined' ? '' : req.body.name,
      email: req.body.email === 'undefined' ? '' : req.body.email,
      website: req.body.website === 'undefined' ? '' : req.body.website,
      facebook_url: req.body.facebook_url === 'undefined' ? '' : req.body.facebook_url,
      twitter_url: req.body.twitter_url === 'undefined' ? '' : req.body.twitter_url
    }
    users.updateUser(data.name, data.email, data.website, data.facebook_url, data.twitter_url, req.body.id)
    .then ((user) => {
      const data = user.rows[0];
      console.log('data after update: ', data);
      res.status(200).send({
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        website: data.website,
        facebook_url: data.facebook_url,
        twitter_url: data.twitter_url
      });
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send({error: err});
    })
  }
};













