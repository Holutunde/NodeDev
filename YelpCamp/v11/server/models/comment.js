var mongoose = require('mongoose')

//COMMENT - text, author
var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    //storing the login details here
    id: {
      type: mongoose.Schema.Types.ObjectId,
      //the model we refer to with the object ID
      ref: 'User',
    },
    username: String,
  },
})

module.exports = mongoose.model('Comment', commentSchema)
