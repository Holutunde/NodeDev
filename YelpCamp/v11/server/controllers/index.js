const User = require('../models/user')

const registerUser = async (req, res) => {
  try {
    const user = req.body.username
    const pass = req.body.password
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
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  registerUser,
}
