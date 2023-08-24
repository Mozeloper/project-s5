
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-form-stepper.cjs.production.min.js')
} else {
  module.exports = require('./react-form-stepper.cjs.development.js')
}
