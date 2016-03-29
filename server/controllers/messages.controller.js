const messagesModel = require('../models/messages.model')






module.exports = {

  submitMessage: (req, res, next) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const message = req.body.message;
    const time = req.body.time;
    messagesModel.submitMessage(message, user1_id, user2_id, time)
    .then( (data) => {
      res.send(data);
    })
    .catch( (err) => {
      console.log('err', err);
      res.status(500).send(err);
    }) 
  },

  fetchConversations: (req, res, next) => {
    const self_id = req.body.self_id;
    messagesModel.fetchConversations(self_id)
    .then( (data) => {
      console.log('data', data.rows);
      res.send(data.rows)
    })
    .catch( (err) => {
      res.status(500).send(err)
    })
  }



}