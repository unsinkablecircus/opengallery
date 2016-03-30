var media_hashTags = require('../models/media_hashTags');

module.exports = {
  submitFeedback: (req, res, body) => {
    var userId = req.body.userId;
    var mediaId = req.body.mediaId;
    var feedback = req.body.feedback.toLowerCase();

    media_hashTags.submitFeedback(userId, mediaId, feedback)
    .then( data => {
      res.status(201).json({
        feedback: data.rows[0].feedback,
        user_feedback_id: data.rows[0].user_feedback_id
      });
    })
    .catch ( err => {
      console.error(`[Error] Could not post user feedback: ${err}`);
      res.status(500).json(`[Error] Could not post user feedback: ${err}`)
    })
  }
}
