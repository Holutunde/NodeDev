var express = require('express'),
  app = express(),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  LocalStrategy = require('passport-local'),
  seedDB = require('./seeds'),
  passportLocalMongoose = require('passport-local-mongoose'),
  commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  authRoutes = require('./routes/index')

mongoose.connect('mongodb://localhost/yelp_camp_v6')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

seedDB()

//passport configuration
app.use(
  require('express-session')({
    secret: 'Once again we move',
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
//Responsibile for reading sessions,taking data and putting in back
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user //To make req.user available in the partials
  next() //Inoder to move to the next middleware
})

app.use('/', authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(3003, function () {
  console.log('YelpCamp has started running')
})
