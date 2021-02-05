
const fs = require('fs')
const http = require('http2')

const cert = fs.readFileSync('localhost-cert.pem')

const fetch = options => {
  return new Promise((resolve, reject) => {
    const client = http.connect(options.host, { ca: cert })
    const req = client.request({
      ':method': options.method,
      ':path': options.path,
      ...options.headers // Todo, make this prettier?
    })

    client.on('error', err => {
      reject(err)
      console.error(err)
    })

    let data = ''

    req.on('data', chunk => {
      data += chunk
    })

    req.on('end', () => {
      resolve(data)
      client.close()
    })

    req.setEncoding('utf8')
    req.end(JSON.stringify(options.body))
  })
}

module.exports = async () => {
  // POST /register
  const resRegister = await fetch({
    method: 'POST',
    host: 'https://localhost:3000',
    path: '/register',
    body: {
      user: 'whaley',
      pass: 'password',
      name: 'Dustin Dowell',
      email: 'dustindowell22@gmail.com',
      phone: '5156895648',
      timezone: 'GMT-6'
    }
  })

  console.log('POST /register', /*resRegister*/)

  // POST /login
  const resLogin = await fetch({
    method: 'POST',
    host: 'https://localhost:3000',
    path: '/login',
    body: {
      user: 'whaley',
      pass: 'password'
    }
  })

  console.log('POST /login', /*resLogin*/)
  const data = JSON.parse(resLogin)

  const resRestricted = await fetch({
    method: 'GET',
    host: 'https://localhost:3000',
    path: '/restricted',
    headers: {
      authorization: 'Bearer ' + data.token
    }
  })

  console.log('GET /restricted', resRestricted)
}
