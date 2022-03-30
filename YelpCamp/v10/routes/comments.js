var express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground'),
  Comment = require('../models/comment')

//COMMENTS ROUTE

//Comments New
router.get('/new', isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})

//Comments Create
router.post('/', isLoggedIn, function (req, res) {
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
          //Add username and id to comment
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          //save comment
          comment.save()
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})

//COMMENT EDIT
router.get('/:comment_.id/edit', function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    if (err) {
      res.redirect('back')
    } else {
      res.render('/comments/edit', {
        campground_id: req.params.id,
        comment: foundComment,
      })
    }
  })
})
//COMMENT UPDATE
router.put('/:comment_id', function (req, res) {
  //find the campground with provided id
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    foundCampground,
  ) {
    if (err) {
      console.log(err)
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

//DELETE
router.delete('/:id', function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      campground.remove()
      res.redirect('/campgrounds')
    }
  })
})
//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/login')
  }
}

module.exports = router
