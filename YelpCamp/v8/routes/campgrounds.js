var express = require('express'),
  router = express.Router({ mergeParams: true }),
  Campground = require('../models/campground')

//index route
router.get('/', function (req, res) {
  // var existingUser = req.user
  //Get all campgrounds from Database
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      console.log(req.user)
      res.render('campgrounds/index', {
        campground: allCampgrounds,
        currentUser: req.user,
      })
    }
  })
})

//new route
router.post('/', function (req, res) {
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var newCampground = { name: name, image: image, description: desc }
  //Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})
router.get('/new', function (req, res) {
  res.render('campgrounds/new')
})

//SHOW - shows more details about one campground
router.get('/:id', function (req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err)
      } else {
        //render show template with that campground
        console.log(foundCampground)
        res.render('campgrounds/show', { campfound: foundCampground })
      }
    })
})

module.exports = router
