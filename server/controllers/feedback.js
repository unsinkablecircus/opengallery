var media_hashTags = require('../models/media_hashTags');

module.exports = {

  submitFeedback: (req, res, body) => {
    var userId = req.body.userId;
    var mediaId = req.body.mediaId;
    var feedback = req.body.feedback.toLowerCase();
    // res.send({foo: 'foobar'});

    media_hashTags.submitFeedback(userId, mediaId, feedback)
    .then( (data) => {
      console.log('row', data.rows[0]);
      res.send({row: data.rows[0]});
    })
    .catch ( (err) => {
      res.status(500).send({err: err})
    })
  }
}