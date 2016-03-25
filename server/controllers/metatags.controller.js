const Meta = require('../models/metatags.model')

/*-----------------------*/
/*     GET /api/meta     */
/*-----------------------*/
exports.searchTags = (req, res) => {
  // URL + '?tags=' + tags.join('?tags=')
  Meta.fetch(req.query.tags)
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
  Meta.insert(req.body.tags)
  .then( data => {
    res.status(201).json(data)
  })
  .catch( err => {
    console.error(`[Error] Failed to insert meta tags to PG: ${err}`)
    res.status(400).send(`[Error] Failed to insert meta tags to PG: ${err}`)
  })
}
