var express = require('express'),
  passport = require('passport'),
  router = express.Router({ mergeParams: true })

const { registerUser } = require('../controllers/index')

//root route
router.get('/landing', function (req, res) {
  res.render('landing')
})

//show register form
router.get('/register', function (req, res) {
  res.render('register')
})

//register
router.post('/register', registerUser)

//show login form
router.get('/login', function (req, res) {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  function (req, res) {},
)

//logout route
router.get('/logout', function (req, res) {
  req.logout()
  req.flash('success', 'Logged you out!')
  res.redirect('/login')
})

module.exports = router
