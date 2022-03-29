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
      //console.log(req.user)
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
  var author = {
    id: req.user._id,
    username: req.user.username,
  }
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author,
  }
  //Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      // newlyCreated.author.id = req.user._id
      // newlyCreated.author.username = req.user.username
      // newlyCreated.save()
      console.log(newlyCreated)
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

//EDIT
router.get('/:id/edit', function (req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      //render show template with that campground
      res.render('campgrounds/edit', { campfound: foundCampground })
    }
  })
})
//UPDATE
router.put('/:id', function (req, res) {
  req.body.campground.body = req.sanitize(req.body.campground.body)
  //find the campground with provided id
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    foundCampground,
  ) {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      //render show template with that campground
      console.log(foundCampground)
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

module.exports = router
