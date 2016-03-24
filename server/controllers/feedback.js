var media_hashTags = require('../models/media_hashTags');

module.exports = {

  submitFeedback: (req, res, body) => {
    var userId = req.body.userId;
    var mediaId = req.body.mediaId;
    var feedback = req.body.feedback.toLowerCase();

    media_hashTags.submitFeedback(userId, mediaId, feedback)
    .then( (data) => {
      console.log('data', data.rows[0]);
      res.send({mediaHashtagTotal: data.rows[0]});
    })
    .catch ( (err) => {
      console.log('err', err);
      res.status(500).send({err: err})
    })
  }
}