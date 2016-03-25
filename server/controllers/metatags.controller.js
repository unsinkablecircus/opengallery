const Meta = require('../models/metatags.model')

exports.addTags = (req, res) => {
  Meta.insert(req.body.tags)
  .then( data => {
    res.status(201).json(data)
  })
  .catch( err => {
    console.error(`[Error] Could not insert meta tags to PG: ${err}`)
    res.status(400).send(`[Error] Could not insert meta tags to PG: ${err}`)
  })
}
