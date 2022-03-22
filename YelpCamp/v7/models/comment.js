var mongoose = require('mongoose')

//COMMENT - text, author
var commentSchema = new mongoose.Schema({
  text: String,
  author: String,
})

module.exports = mongoose.model('Comment', commentSchema)
