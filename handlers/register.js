
const fs = require('fs')
const status = require('../status')

let stream

const send = (status, body) => {
  stream.respond(status.headers)
  stream.end(JSON.stringify(body))
}

module.exports = localStream => {
  stream = localStream

  let data = ''

  stream.on('data', chunk => {
    data += chunk
  })

  stream.on('end', () => {
    const { user, pass, name, email, phone, timezone } = JSON.parse(data)
    const keys = [user, pass, name, email, phone, timezone]

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (typeof key !== 'string') {
        send(status.badRequest, {
          success: false,
          message: status.badRequest.body
        })

        return // exit
      }
    }

    // For testing I'm skipping password hashing
    // Password hashing should happen here before storage

    // For testing I'm persisting data with the file system
    const file = JSON.stringify({ user, pass, name, email, phone, timezone })
    fs.writeFileSync('database/' + user + '.json', file)

    send(status.success, {
      success: true,
      message: status.success.body
    })
  })
}
