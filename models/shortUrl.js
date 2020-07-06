const mongoose = require('mongoose')
const shortId = require('shortid')
var jwt = require ('jsonwebtoken');

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema)