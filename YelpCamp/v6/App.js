var express = require('express'),
  app = express(),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  User = require('./models/user'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose')

mongoose.connect('mongodb://localhost/yelp_camp_v6')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

var Campground = require('./models/campground')
var Comment = require('./models/comment')
var seedDB = require('./seeds')
seedDB()

//PASSPORT CONFIGURATION
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

app.get('/landing', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  // var existingUser = req.user
  //Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {
        campground: allCampgrounds,
        currentUser: req.user,
      })
    }
  })
})
app.post('/campgrounds', function (req, res) {
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = { name: name, image: image, description: desc }
  //Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})
app.get('/campgrounds/new', function (req, res) {
  res.render('campgrounds/new')
})
//SHOW - shows more details about one campground
app.get('/campgrounds/:id', function (req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err)
      } else {
        //render show template with that campground
        console.log(foundCampground)
        res.render('campgrounds/show', { campfound: foundCampground })
      }
    })
})
//-------------------
//COMMENTS ROUTE
//--------------------
app.get('/campgrounds/:id/comments/new', isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})
app.post('/campgrounds/:id/comments', isLoggedIn, function (req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err)
        } else {
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})

//AUTH ROUTE
//show register form
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
      res.redirect('/campgrounds')
    })
  })
})
//show login form
app.get('/login', function (req, res) {
  res.render('login')
})

app.post(
  '/login',
  //middleware
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
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
app.listen(3004, function () {
  console.log('YelpCamp has started running')
})
