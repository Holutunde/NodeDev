var express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/auth_demo_app')

var app = express()
app.use(
  require('express-session')({
    secret: 'Rusty is the best and the cutest dog in the world',
    resave: false,
    saveUninitialized: false,
  }),
)
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
//Responsibile for reading sessions,taking data and putting in back
passport.deserializeUser(User.deserializeUser())

//ROUTES
app.get('/', function (req, res) {
  res.render('home')
})
app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret')
})

//Auth Register
app.get('/register', function (req, res) {
  res.render('register')
})
app.post('/register', function (req, res) {
  var user = req.body.username
  var pass = req.body.password
  User.register(new User({ username: user }), pass, function (err, user) {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/secret')
    })
  })
})

//Login Routes
app.get('/login', function (req, res) {
  res.render('login')
})

app.post(
  '/login',
  //middleware
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
  }),
  function (req, res) {},
)
//Logout Routes
app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

app.listen(3003, function () {
  console.log('Authentication has started')
})
