var mongoose = require('mongoose')

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    //storing the login details here
    id: {
      type: mongoose.Schema.Types.ObjectId,
      //ref - the model we refer to with the object ID
      ref: 'User',
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

module.exports = mongoose.model('Campground', campgroundSchema)
