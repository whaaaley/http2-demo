
module.exports = {
  preflight: {
    headers: {
      ':status': 200,
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-origin': '*'
    },
    body: '200 OK'
  },
  success: {
    headers: {
      ':status': 200,
      'access-control-allow-origin': '*'
    },
    body: '200 OK'
  },
  unauthorized: {
    headers: {
      ':status': 401,
      'access-control-allow-origin': '*'
    },
    body: '401 Unauthorized'
  },
  notFound: {
    headers: {
      ':status': 404,
      'access-control-allow-origin': '*'
    },
    body: '404 Not Found'
  },
  methodNotAllowed: {
    headers: {
      ':status': 405,
      'access-control-allow-origin': '*'
    },
    body: '405 Method Not Allowed'
  },
  badRequest: {
    headers: {
      ':status': 400,
      'access-control-allow-origin': '*'
    },
    body: '400 Bad Request'
  }
}
