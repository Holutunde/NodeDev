;(express = require('express')),
  (router = express.Router({ mergeParams: true })),
  (middleware = require('../../middleware/index'))

const {
  createNewComment,
  newCommentPage,
  editComment,
  updateComment,
  deleteComment,
} = require('../controllers/comment')

//GET NEW COMMENT PAGE
router.get('/new', middleware.isLoggedIn, newCommentPage)

//POST NEW COMMENT
router.post('/', middleware.isLoggedIn, createNewComment)

//COMMENT EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, editComment)

//COMMENT UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, updateComment)

//COMMENT DELETE
router.delete('/:comment_id', middleware.checkCommentOwnership, deleteComment)

module.exports = router
