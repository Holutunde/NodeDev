var mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
})

UserSchema.plugin(passportLocalMongoose)
//Adds serialized and unserialized method automatically

module.exports = mongoose.model('User', UserSchema)
