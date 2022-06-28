var Campground = require('../server/models/campground'),
  Comment = require('../server/models/comment')

// all the middleare goes here
var middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err) {
        req.flash('error', 'Campground not found')
        res.redirect('back')
      } else {
        // does user own the campground?
        if (Number(foundCampground.author.id) === Number(req.user._id)) {
          console.log(foundCampground.author.id)
          console.log(req.user._id)
          next()
        } else {
          req.flash('error', "You don't have permission to do that")
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', 'Kidly log in to edit or delete campground')
    res.redirect('back')
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect('back')
      } else {
        // does user own the comment?
        if (foundComment.author.id.toString() === req.user._id.toString()) {
          next()
        } else {
          req.flash('error', "You don't have permission to do that")
          res.redirect('back')
        }
      }
    })
  } else {
    req.flash('error', 'Kidly log in to edit or delete comment')
    res.redirect('back')
  }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'Kindly log in to create campgrounds ')
  res.redirect('/login')
}

module.exports = middlewareObj
