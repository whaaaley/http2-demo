
const status = require('../status')

module.exports = stream => {
  const body = JSON.stringify({
    success: true,
    message: 'Horray! We verified our idenity and accessed resstricted content!'
  })

  stream.respond(status.success.headers)
  stream.end(body)
}
