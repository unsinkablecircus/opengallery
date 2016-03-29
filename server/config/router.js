const helpers = require('./helpers.js');
const multer = require('multer');

const Auth = require('../controllers/auth.controller');
const Feedback = require('../controllers/feedback');
const Media = require('../controllers/media');
const Meta = require('../controllers/metatags.controller');
const User = require('../controllers/user.controller');
const Vision = require('../controllers/vision.controller');
const Messages = require('../controllers/messages.controller')

module.exports = function (app, express) {

  app.post('/api/user/signIn', Auth.signIn);
  app.post('/api/user/signUp', Auth.signUp);

  app.get('/api/artist', User.loadProfile)
  app.post('/api/user/saveChanges', Auth.saveChanges);

  app.get('/api/media', Media.getPhotos); 
  app.post('/api/media/upload', multer().single('artImage'), Media.uploadPhoto);
  app.put('/api/media/edit', Media.updatePhoto);
  app.delete('api/media/delete', Media.deletePhoto);
  // app.post('/api/media/edit', Media.updatePhoto);

  app.post('/api/messages', Messages.submitMessage);

  app.post('/api/feedback/submitFeedback', Feedback.submitFeedback)

  app.get('/api/vision', Vision.detectLabels)
  app.post('/api/metatags', Meta.createTags)

  // With react router, server needs to serve up files
  app.get('*', function (request, response){
    response.sendFile('index.html', {"root": "public"})
  })
};
