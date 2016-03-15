// var request = require('supertest');
var express = require('express');

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var app = require('../server/server.js');
var db = require('../server/db/database.js');
var AWS = require('aws-sdk');

// load AWS credentials
var credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});

describe('', function() {

  describe('PostgreSQL Database: ', function() {
    it('Should have all the tables', function(done) {
      db.raw("SELECT table_name FROM information_schema.tables WHERE table_schema='public';")
        .then((res) => {
          expect(res.rows).to.deep.include.members([
            { table_name: 'tags' },
            { table_name: 'media_tags' },
            { table_name: 'media' },
            { table_name: 'media_hashtag_totals' },
            { table_name: 'users' },
            { table_name: 'hashtags' },
            { table_name: 'media_hashtags' }
          ]);
          expect(res.rows.length).to.equal(7);
          done();
        })
        .catch((err) => {
          expect(err).to.be.null;
          done();
        });
    });

    it('Creates a new table in database', function(done) {
      db.raw("CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN);")
        .then((res) => {
          db.raw("SELECT * FROM items")
            .then((res) => {
              db.raw("DROP table items;")
              .then((res) => {
                done();
              })
              .catch((err) => {
                expect(err).to.be.null;
                done();
              })
            })
            .catch((err) => {
              expect(err).to.be.null;
              done();
            })
        })
        .catch((err) => {
          expect(err).to.be.null;
          done();
        });
    });
    
  });

  // describe('Photo Fetch:', function() {
  //   it('Fetch Photos should respond with 200', function(done) {
  //     request(app)
  //       .get('/fetchPhotos?lat=37.78379&lon=-122.4089&radius=50')
  //       .end(function(err, res) {
  //         expect(res.statusCode).to.equal(200);
  //         done();
  //       });
  //   });
  // });

  // describe('Account Creation:', function() {
  //   this.timeout(10000);
  //   it('Signup creates a new user', function(done) {
  //     request(app)
  //       .post('/signup')
  //       .send(JSON.stringify({
  //         'username': 'test',
  //         'password': 'test' }))
  //       .expect(function(res) {
  //         User.findOne({'username': 'test'})
  //           .exec(function(err, user) {
  //             if (err) { return done(err); }
  //             expect(user.username).to.equal('test');
  //           });
  //       })
  //       .expect(function() {
  //         User.remove({'username': 'test'})
  //           .exec(function(err, user) {
  //             if (err) { return done(err); }
  //           });
  //       })
  //       .expect(200, done);
  //   });

  // });

  // describe('Account Login:', function() {
  //   this.timeout(10000);
    
  //   beforeEach(function(done) {
  //     request(app)
  //       .post('/signup')
  //       .send(JSON.stringify({
  //         'username': 'test',
  //         'password': 'test' }))
  //       .expect(200, done); 
  //   });
    
  //   it('Logs in existing users', function(done) {
  //     request(app)
  //       .post('/login')
  //       .send(JSON.stringify({
  //         'username': 'test',
  //         'password': 'test' }))
  //       .expect(function(res) {
  //         expect(res.body.userId).to.not.be.undefined;
  //       })
  //       .expect(200, done);
  //   });

  //   it('Users that do not exist are not logged in', function(done) {
  //     request(app)
  //       .post('/login')
  //       .send(JSON.stringify({
  //         'username': 'Fred',
  //         'password': 'Fred' }))
  //       .expect(function(res) {
  //         expect(res.text).to.equal('User does not exist');
  //       })
  //       .expect(500, done);
  //   });

  //   afterEach(function(done) {
  //     User.remove({'username': 'test'})
  //       .exec(function(err, user) {
  //         if (err) { return done(err); }
  //         done();
  //       });
  //   });

  // });

});