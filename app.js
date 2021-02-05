
const jwt = require('./lib/auth/jwt')
const status = require('./status')
const endpoints = require('./endpoints')

const secret = process.env.SECRET

let stream
let headers

const send = status => {
  stream.respond(status.headers)
  stream.end(status.body)
}

const select = scope => {
  const { ':method': method, ':path': path } = headers
  const handler = scope[method][path]

  handler === undefined
    ? send(status.notFound)
    : handler(stream)
}

const router = () => {
  const { 'authorization': auth } = headers

  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    const { claims, verified } = jwt.verify(auth.slice(7), secret)

    verified === true && Date.now() < claims.exp
      ? select(endpoints.private)
      : send(status.unauthorized)

    return // exit
  }

  select(endpoints.public)
}

module.exports = (localStream, localHeaders) => {
  stream = localStream
  headers = localHeaders

  const { ':method': method } = headers

  switch (method) {
    case 'OPTIONS': send(status.preflight); break
    case 'POST': router(); break
    case 'GET': router(); break
    default: send(status.methodNotAllowed)
  }

  stream = undefined
  headers = undefined
}
