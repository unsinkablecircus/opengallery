const vision = require('node-cloud-vision-api')
const Promise = require('bluebird')

vision.init({ auth: process.env.API_GOOL_VISION_SERVER_KEY })

exports.analyze = () => {
  const req = new vision.Request({
    image: new vision.Image({ url: 'http://images.birthdayexpress.com/mgen/jointed-circus-clown-cutout-bx-85682.jpg' }),
    // image: new vision.Image(__dirname + '/../../test/server/circus.jpg'),
    features: [
      new vision.Feature('LABEL_DETECTION', 10),
      new vision.Feature('SAFE_SEARCH_DETECTION')
    ]
  })

  return vision.annotate(req)
  .then( res => {
    console.log(JSON.stringify(res.responses))
    return res.responses
  })
  .catch( err => {
    console.error(`Google Vision API: ${err}`)
    return Promise.reject(`Google Vision API ${err}`)
  })
}
