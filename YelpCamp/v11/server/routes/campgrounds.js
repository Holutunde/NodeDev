const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../../middleware')

const {
  getAllCampgrounds,
  createNewCampground,
  getSingleCampground,
  editCampground,
  updateCampground,
  deleteCampground,
} = require('../controllers/campground.js')

//index route
router.get('/', getAllCampgrounds)

//CREATE new route
router.post('/', middleware.isLoggedIn, createNewCampground)

//NEW
router.get('/new', middleware.isLoggedIn, function (req, res) {
  res.render('campgrounds/new')
})

//SHOW - shows more details about one campground
router.get('/:id', getSingleCampground)

//EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, editCampground)

//UPDATE
router.put('/:id', updateCampground)

//DELETE
router.delete('/:id', middleware.checkCampgroundOwnership, deleteCampground)

module.exports = router
