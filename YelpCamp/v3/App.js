var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/yelp_camp')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

var Campground = require('./models/campground')
var seedDB = require('./seeds')

seedDB()

// Campground.create(
//   {
//     name: 'Olutunde',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
//     description: 'This is a beautiful man with a good heartt',
//   },
//   function (err, campground) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Newly Created')
//       console.log(campground)
//     }
//   },
// )

// var campgrounds = [
//   {
//     name: 'Olutunde',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
//   },
//   {
//     name: 'Topeolu',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
//   },
//   {
//     name: 'Benson',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
//   },
//   {
//     name: 'Olutunde',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
//   },
//   {
//     name: 'Topeolu',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
//   },
//   {
//     name: 'Benson',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
//   },
//   {
//     name: 'Olutunde',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
//   },
//   {
//     name: 'Topeolu',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
//   },
//   {
//     name: 'Benson',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
//   },
// ]

app.get('/landing', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  //Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { campground: allCampgrounds })
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
  res.render('new')
})
//SHOW - shows more details about one campground
app.get('/campgrounds/:id', function (req, res) {
  //find the campground with provided id
  Campground.findById(req.params.id, function (err, foundCampround) {
    if (err) {
      console.log(err)
    } else {
      //render show template with that campground
      res.render('show', { campfound: foundCampround })
    }
  })
})

app.listen(3006, function () {
  console.log('YelpCamp has started running')
})
