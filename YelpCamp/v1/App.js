var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

var campgrounds = [
  {
    name: 'Olutunde',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
  },
  {
    name: 'Topeolu',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
  },
  {
    name: 'Benson',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
  },
  {
    name: 'Olutunde',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
  },
  {
    name: 'Topeolu',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
  },
  {
    name: 'Benson',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
  },
  {
    name: 'Olutunde',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSloh2QPnFddiRhrtghChP-0sUmS9fYsaKhmQ&usqp=CAU',
  },
  {
    name: 'Topeolu',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7CDJOX-23QWdPR_NUaT-BjQtfK4uTDhhJDA&usqp=CAU',
  },
  {
    name: 'Benson',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
  },
]

app.get('/landing', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  res.render('campgrounds', { campground: campgrounds })
})
app.post('/campgrounds', function (req, res) {
  var name = req.body.name
  var image = req.body.image
  var data = { name: name, image: image }
  console.log(data)
  campgrounds.push(data)
  res.redirect('/campgrounds')
})
app.get('/campgrounds/new', function (req, res) {
  res.render('new')
})
app.listen(3001, function () {
  console.log('YelpCamp has started running')
})
