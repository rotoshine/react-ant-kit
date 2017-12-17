if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod')
} else if( process.env.NODE_ENV === 'test') {
  module.exports = require('./configureStore.qa')
} else {
  module.exports = require('./configureStore.dev')
}