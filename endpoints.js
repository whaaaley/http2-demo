
const login = require('./handlers/login')
const register = require('./handlers/register')
const restricted = require('./handlers/restricted')

module.exports = {
  public: {
    GET: {

    },
    POST: {
      '/login': login,
      '/register': register
    }
  },
  private: {
    GET: {
      '/restricted': restricted
    },
    POST: {
      // '/upload': upload
    }
  }
}
