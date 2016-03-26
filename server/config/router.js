const helpers = require('./helpers.js');
//https://github.com/expressjs/multer for image upload parsing
var multer = require('multer');

var User = require('../controllers/users');
var Media = require('../controllers/media');
var Feedback = require('../controllers/feedback');
var Search = require('../controllers/search')

module.exports = function (app, express) {

  app.post('/api/user/signIn', User.signIn);
  app.post('/api/user/signUp', User.signUp);

  app.post('/api/user/saveChanges', User.saveChanges);

  app.get('/api/media/', Media.getPhotos); // use this for search 
  app.post('/api/media/upload', multer().single('artImage'), Media.uploadPhoto);
  // app.post('/api/media/edit', Media.updatePhoto);


  app.post('/api/feedback/submitFeedback', Feedback.submitFeedback)
  
  //get rid of this
  app.post('/api/search',  Search.search)

  // With react router, server needs to serve up files
  app.get('*', function (request, response){
    response.sendFile('index.html', {"root": "public"})
  })
};
