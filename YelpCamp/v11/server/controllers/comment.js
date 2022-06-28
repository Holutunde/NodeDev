const Campground = require('../models/campground')
const Comment = require('../models/comment')

const newCommentPage = async (req, res) => {
  try {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err)
      } else {
        res.render('comments/new', { campground: campground })
      }
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const createNewComment = async (req, res) => {
  try {
    //lookup campground using id
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err)
        res.redirect('/campgrounds')
      } else {
        Comment.create(req.body.comment, function (err, comment) {
          //Add username and id to comment
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          //save comment
          comment.save()
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        })
      }
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const editComment = (req, res) => {
  try {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      res.render('comments/edit', {
        campground_id: req.params.id,
        comment: foundComment,
      })
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const updateComment = (req, res) => {
  try {
    Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body.comment,
      function (err, updatedComment) {
        if (err) {
          res.redirect('back')
        } else {
          res.redirect('/campgrounds/' + req.params.id)
        }
      },
    )
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const deleteComment = (req, res) => {
  try {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
      if (err) {
        res.redirect('back')
      } else {
        req.flash('success', 'Comment deleted')
        res.redirect('/campgrounds/' + req.params.id)
      }
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  createNewComment,
  newCommentPage,
  editComment,
  updateComment,
  deleteComment,
}
