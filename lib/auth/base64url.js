
// TODO:
// Regex is slow but this is good enough for now

// data = string
const escape = data => {
  return data.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// data = object
const encode = data => {
  return escape(Buffer.from(JSON.stringify(data)).toString('base64'))
}

// data = string
const decode = data => {
  return JSON.parse(Buffer.from(data, 'base64').toString())
}

module.exports = { escape, encode, decode }
