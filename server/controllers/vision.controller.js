const Vision = require('../models/vision.model')

/*------------------------*/
/*     GET /api/vision    */
/*------------------------*/
exports.detectLabels = (req, res) => {
  Vision.analyze()
  .then( labels => {
    res.status(200).json(labels)
  })
  .catch( err => {
    console.error(`Failed to detect labels for photo: ${err}`)
    res.status(404).send(`Failed to detect labels for photo: ${err}`)
  })
}
