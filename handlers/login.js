
const fs = require('fs')
// const database = require('../database')
const status = require('../status')
const jwt = require('../lib/auth/jwt')

const secret = process.env.SECRET

console.log('Proof the secret is getting set:')
console.log(secret)
console.log()

module.exports = stream => {
  let data = ''

  stream.on('data', chunk => {
    data += chunk
  })

  stream.on('end', () => {
    data = JSON.parse(data)
    // const user = database[data]

    // This is obviously temporary
    // Equivalent to a database get user object call
    const user = JSON.parse(
      fs.readFileSync('database/' + data.user + '.json')
    )

    // Also for demo purposes
    // Definitely don't do this for production
    // We should be verifying a hash instead
    if (data.pass === user.pass) {
      // Also don't mutate the user object like this
      user.valid = true
      // console.log('user is real')
    }

    if (user && user.valid) {
      const body = JSON.stringify({
        name: user.name,
        token: jwt.encode({ exp: Date.now() + 3600000 }, secret)
      })

      stream.respond(status.success.headers)
      stream.end(body)
    }
  })
}
