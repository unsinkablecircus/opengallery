const User = require('../models/user.model')

/*----------------------*/
/*     GET /api/user    */
/*----------------------*/
exports.loadProfile = (req, res) => {
  User.fetch(req.query)
  .then( media => {
    res.status(200).json(media)
  })
  .catch( err => {
    console.error(`[Error] Failed to fetch user media in PG: ${err}`)
    res.status(404).send(`[Error] Failed to fetch user media in PG: ${err}`)
  })
}
