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

//COMMENTS Create
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
router.get('/:comment_id/edit', function (req, res) {
  Comment.findById(req.params.comment_id, function (err, foundComment) {
    res.render('comments/edit', {
      campground_id: req.params.id,
      comment: foundComment,
    })
  })
})

//COMMENT UPDATE
router.put('/:comment_id', function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    updatedComment,
  ) {
    if (err) {
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

//DELETE
router.delete('/:comment_id', function (req, res) {
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect('back')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
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

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err) {
        res.redirect('back')
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next()
        } else {
          res.redirect('back')
        }
      }
    })
  } else {
    res.redirect('back')
  }
}

module.exports = router
