
const crypto = require('crypto')
const base64url = require('./base64url')

// header = string
const header = base64url.encode({ alg: 'HS256', typ: 'JWT' })

// data = string, key = string
const sign = (data, key) => {
  return crypto.createHmac('sha256', key).update(data).digest('base64')
}

// claims = { $string: string || number }, key = string
const encode = (claims, key) => {
  const data = header + '.' + base64url.encode(claims)
  return data + '.' + base64url.escape(sign(data, key))
}

// jwt = string, key = string
const verify = (jwt, key) => {
  const [header, payload, signature] = jwt.split('.')

  if (signature === base64url.escape(sign(header + '.' + payload, key))) {
    return {
      claims: base64url.decode(payload),
      verified: true
    }
  }

  return {
    verified: false
  }
}

module.exports = { encode, verify }
