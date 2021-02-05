
const fs = require('fs')
const http = require('http2')

const app = require('./app')
const test = require('./test')

const server = http.createSecureServer({
  cert: fs.readFileSync('localhost-cert.pem'),
  key: fs.readFileSync('localhost-key.pem')
})

server.on('error', err => {
  console.error(err)
})

server.on('stream', (stream, headers) => {
  try {
    app(stream, headers)
  } catch (err) {
    console.log(err)
  }
})

server.listen(3000)

// API Testing

const handler = () => {
  console.log('run tests...')
  test()
}

setTimeout(handler, 2000)
