if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production');
} else if (process.env.NODE_ENV === 'integration') {
  console.log('integration');
  module.exports = require('./integration');
} else {
  module.exports = require('./development');
}