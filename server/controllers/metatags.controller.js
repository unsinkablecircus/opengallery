const Meta = require('../models/metatags.model')

/*-----------------------*/
/*     GET /api/meta     */
/*-----------------------*/
exports.searchTags = (req, res) => {
  // Change it so this controller is called from MEDIA?
  // then you just give it a req.tags and a req.mediaId???
  // or do we need this to be an endpoint ever?
  Meta.fetch(req.query)
  .then( data => {
    res.status(200).json(data)
  })
  .catch( err => {
    console.error(`[Error] Failed to query meta tags in PG: ${err}`)
    res.status(404).send(`[Error] Failed to query meta tags in PG: ${err}`)
  })
}

/*------------------------*/
/*     POST /api/meta     */
/*------------------------*/
exports.createTags = (req, res) => {
  Meta.insert(req.body)
  .then( data => {
    res.status(201).json(data)
  })
  .catch( err => {
    console.error(`[Error] Failed to insert meta tags to PG: ${err}`)
    res.status(400).send(`[Error] Failed to insert meta tags to PG: ${err}`)
  })
}
