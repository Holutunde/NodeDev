var express = require('express'),
  passport = require('passport'),
  router = express.Router({ mergeParams: true }),
  User = require('../models/user')

//root route
router.get('/landing', function (req, res) {
  res.render('landing')
})
//AUTH ROUTE
//show register form
router.get('/register', function (req, res) {
  res.render('register')
})
router.post('/register', function (req, res) {
  var user = req.body.username
  var pass = req.body.password
  User.register(new User({ username: user }), pass, function (err, user) {
    if (err) {
      console.log(err)
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/login')
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
  res.redirect('/login')
})

//midlleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router
