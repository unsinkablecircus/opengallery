// var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

var express = require('express');
var app = require('../server/server.js');
var db = require('../server/db/database.js');
var AWS = require('aws-sdk');
var jimp = require('jimp');

var mediaModel = require('../server/models/media');
var mediaController = require('../server/controllers/media');

// load AWS credentials
var credentials = new AWS.SharedIniFileCredentials({profile: 'opengallery'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-west-1'});
const s3 = new AWS.S3();

describe('', function() {

  xdescribe('PostgreSQL Database: ', function() {
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

  describe('Media Controller: ', function() {
    it('Should have a function called uploadPhoto', function() {
      expect(mediaController.uploadPhoto).to.be.a('function');
    });
    it('Should have a function called getPhotos', function() {
      expect(mediaController.getPhotos).to.be.a('function');
    });
  });

  describe('Media Model: ', function() {
    //Unit Tests
    it('Should have a function called uploadToPG', function() {
      expect(mediaModel.uploadToPG).to.be.a('function');
    });
    it('Should have a function called uploadToS3', function() {
      expect(mediaModel.uploadToS3).to.be.a('function');
    });
    it('Should have a function called updatePGid', function() {
      expect(mediaModel.updatePGid).to.be.a('function');
    });
    it('Should have a function called retrievePhotosFromPG', function() {
      expect(mediaModel.retrievePhotosFromPG).to.be.a('function');
    });
    
    //Writing to DB Tests
    it('Should retrieve photos information from PostgreSQL', function(done) {
      mediaModel.retrievePhotosFromPG(
        function(err, data) {
        if (err) {
          console.log(err);
        } else {
          return data
        }
      })
      .then(function (data) {
        console.log("Successfully retrieved photos from PostgreSQL");
        expect(data).to.have.property('rowCount');
        done();
      })
      .catch(function (err) {
        console.log("Error retrieving photo data from PostgreSQL", err);
        done();
      })
    });

    it('Should upload photo metaData to PostgreSQL', function(done) {
      var sampleData = {
        user: 3,
        url_small: 'url789_small',
        url_med: 'url789_medium',
        url_large: 'url789_large',
        title: 'MegansPhoto',
        description: 'ImFancy'
      };

      mediaModel.uploadToPG(sampleData)
      .then(function(data){
        console.log("Successfully uploaded data to PG");
        expect(data.rowCount).to.equal(1);
        done();
      })
      .catch((err) => {
        console.log("Error uploading data to PostgreSQL", err);
        done();
      });
    });

    it('Should upload a string to S3 and return a string', function(done) {
      mediaModel.uploadToS3(22, "TEST_STRING")
      .then(function(data) {
        console.log("Successfully uploaded string to s3", data.ETag);
        expect(data.ETag).to.be.a('string');
        done();
      })
      .catch(function(err) {
        console.log("Error uploading photo to S3 in test", err);
        expect(err).to.be.null;
        done();
      });
    });

    it('Should convert a photo to buffer and upload it to S3', function(done) {
      var photoBuff = ('./circus.jpg');
      // jimp.read(('./circus.jpg'), function(err, image) {
      //   if (err) {
      //     console.log("error reading image", err);
      //   } else {
      //     image.getBuffer( jimp.MIME_JPEG, function(err, bufferImg) {
      //       if (err) {
      //         console.log('You didn\'t set up your test correctly!', err);
      //       } else {
      //         photoBuff = bufferImg;
      //       }
      //     })
      //   }
      // });
      mediaModel.uploadToS3(40, photoBuff)
      .then(function(photoId){
        console.log("Successfully uploaded photo to S3", photoId.ETag);
        expect(photoId.ETag).to.be.a('string');
        done();
      })
      .catch((err) => {
        expect(err).to.be.null;
        done();
      });
    });

    it('Should update photos urls to PostgreSQL', function() {
      mediaModel.updatePGid(['url123_medium', 'url123_large'], 1)
      .then(function(data) {
        console.log("Successfully updated id: " + id + " medium and large urls", data);
        expect(data);
      })
      .catch(function(err) {
        console.log("Error uploading metaData to PG", err);
        expect(err).to.be.null;
      });
    });
  });

});