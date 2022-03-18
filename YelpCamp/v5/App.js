var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

var Campground = require('./models/campground')
var Comment = require('./models/comment')
var seedDB = require('./seeds')
seedDB()

app.get('/landing', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', { campground: allCampgrounds })
    }
  })
})
app.post('/campgrounds', function (req, res) {
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
app.get('/campgrounds/new', function (req, res) {
  res.render('campgrounds/new')
})
//SHOW - shows more details about one campground
app.get('/campgrounds/:id', function (req, res) {
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
//COMMENTS ROUTE
app.get('/campgrounds/:id/comments/new', function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render('comments/new', { campground: campground })
    }
  })
})
app.post('/campgrounds/:id/comments', function (req, res) {
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
          campground.comments.push(comment)
          campground.save()
          res.redirect('/campgrounds/' + campground._id)
        }
      })
    }
  })
})
app.listen(3004, function () {
  console.log('YelpCamp has started running')
})
