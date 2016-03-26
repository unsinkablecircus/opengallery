const helpers = require('./helpers.js');
const multer = require('multer');

<<<<<<< HEAD
var User = require('../controllers/users');
var Media = require('../controllers/media');
var Feedback = require('../controllers/feedback');
var Search = require('../controllers/search')
=======
const Auth = require('../controllers/users');
const Feedback = require('../controllers/feedback');
const Media = require('../controllers/media');
const Meta = require('../controllers/metatags.controller');
const User = require('../controllers/user.controller');
>>>>>>> 106223f7aba9004622f91078cdc07771a0dac548

module.exports = function (app, express) {

  app.post('/api/user/signIn', Auth.signIn);
  app.post('/api/user/signUp', Auth.signUp);

  app.get('/api/user', User.loadProfile)
  app.post('/api/user/saveChanges', Auth.saveChanges);

  app.get('/api/media/', Media.getPhotos); // use this for search 
  app.post('/api/media/upload', multer().single('artImage'), Media.uploadPhoto);
  // app.post('/api/media/edit', Media.updatePhoto);


  app.post('/api/feedback/submitFeedback', Feedback.submitFeedback)
  
  //get rid of this
  app.post('/api/search',  Search.search)

  app.get('/api/metatags', Meta.searchTags)
  app.post('/api/metatags', Meta.createTags)

  // With react router, server needs to serve up files
  app.get('*', function (request, response){
    response.sendFile('index.html', {"root": "public"})
  })
};
