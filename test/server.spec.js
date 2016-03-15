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

});