var express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground'),
  Comment = require('../models/comment'),
  middleware = require('../middleware')

//COMMENTS ROUTE

//Comments New
router.get('/new', middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})

//COMMENTS Create
router.post('/', middleware.isLoggedIn, function (req, res) {
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

module.exports = router
