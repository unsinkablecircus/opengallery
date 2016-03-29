const messagesModel = require('../models/messages.model')






module.exports = {

  submitMessage: (req, res, next) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const message = req.body.message;
    const sender = req.body.sender;
    const time = req.body.time;
    console.log(user1_id, user2_id, message, sender, time);
    messagesModel.submitMessage(user1_id, user2_id, message, sender, time)
    .then( (data) => {
      console.log('submitted');
      res.send({foo: 'bar'});
    })
    .catch( (err) => {
      console.log('err', err);
      res.status(500).send(err);
    }) 
  }



}