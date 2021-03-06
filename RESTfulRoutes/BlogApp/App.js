var express = require('express'),
  app = express(),
  expressSanitizer = require('express-sanitizer'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose')

//APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(expressSanitizer())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
})
var Blog = mongoose.model('Blog', blogSchema)

//RESTFUL ROUTES

app.get('/', function (req, res) {
  res.redirect('/blogs')
})
//INDEX ROUTE
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { blogs: blogs })
    }
  })
})

// NEW ROUTE
app.get('/blogs/new', function (req, res) {
  res.render('new')
})

// CREATE Route
app.post('/blogs', function (req, res) {
  // Create Blog
  req.body.blog.body = req.sanitize(req.body.blog.body)
  //all input name grouped togeter into blog
  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) {
      console.log(err)
      res.render('new')
    } else {
      // Then, redirect to the index.
      res.redirect('/blogs')
    }
  })
})

// SHOW Route
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      console.log(err)
      res.redirect('/blogs')
    } else {
      res.render('show', { blog: foundBlog })
    }
  })
})

// EDIT Route
app.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      console.log(err)
      res.redirect('/blogs')
    } else {
      res.render('edit', { blog: foundBlog })
    }
  })
})
// UPDATE Route
app.put('/blogs/:id', function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (
    err,
    updatedBlog,
  ) {
    if (err) {
      console.log(err)
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs/' + req.params.id)
    }
  })
})

// DESTROY Route
app.delete('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) {
      console.log(err)
    } else {
      blog.remove()
      res.redirect('/blogs')
    }
  })
})

app.listen('3003', function () {
  console.log('O ti zeh')
})
