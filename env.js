
const crypto = require('crypto')
const fs = require('fs')

const data = 'SECRET=' + crypto.randomBytes(256).toString('hex')

function handler(err) {
  if (err) throw err
  console.log('The file has been saved!')
}

fs.writeFile('.env', data, handler)
