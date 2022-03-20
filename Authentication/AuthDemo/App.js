var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/auth_demo_app')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
  res.render('home')
})
app.get('/secret', function (req, res) {
  res.render('Home')
})

app.listen(3005, function () {
  console.log('Authentication has started')
})
