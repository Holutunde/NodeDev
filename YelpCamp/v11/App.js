var express = require('express'),
  app = express(),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  expressSanitizer = require('express-sanitizer'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  User = require('./server/models/user'),
  LocalStrategy = require('passport-local'),
  seedDB = require('./seeds'),
  passportLocalMongoose = require('passport-local-mongoose'),
  commentRoutes = require('./server/routes/comments'),
  campgroundRoutes = require('./server/routes/campgrounds'),
  authRoutes = require('./server/routes/index')

mongoose.connect('mongodb://localhost/yelp_camp_v8')
app.set('view engine', 'ejs')
app.use(expressSanitizer())
app.use(flash())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
//disable seedDB
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
  res.locals.currentUser = req.user
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  next() //Inoder to move to the next middleware
})

app.use('/', authRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(3003, function () {
  console.log('YelpCamp has started running')
})
