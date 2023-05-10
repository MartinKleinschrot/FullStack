require('dotenv').config()

const PORT = process.env.PORT
var MONGODB_URI = ''

process.env.NODE_ENV === 'test'
  ? MONGODB_URI = process.env.TEST_MONGODB_URI
  : MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
}
