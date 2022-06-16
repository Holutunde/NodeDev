var express = require('express'),
  passport = require('passport'),
  router = express.Router({ mergeParams: true }),
  User = require('../models/user')

//root route
router.get('/landing', function (req, res) {
  res.render('landing')
})

//show register form
router.get('/register', function (req, res) {
  res.render('register')
})

router.post('/register', function (req, res) {
  var user = req.body.username
  var pass = req.body.password
  User.register(new User({ username: user }), pass, function (err, user) {
    console.log(err)
    if (err) {
      req.flash('error', err.message)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      req.flash('success', 'Welcome to YelpCamp')
      res.redirect('/campgrounds')
    })
  })
})
//show login form
router.get('/login', function (req, res) {
  res.render('login')
})

router.post(
  '/login',
  //middleware
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  function (req, res) {},
)
//Logout route
router.get('/logout', function (req, res) {
  req.logout()
  req.flash('success', 'Logged you out!')
  res.redirect('/login')
})

module.exports = router
