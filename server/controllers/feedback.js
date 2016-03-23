


module.exports = {

  submitFeedback: (req, res, body) => {
    var submitter = req.body.username;
    var tile = req.body.tile;
    var feedback = req.body.info;
    console.log( req.body);
    res.send({foo: 'foobar'});
  }
}