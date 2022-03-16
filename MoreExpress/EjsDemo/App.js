var express = require('express')
var app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/select/:name', function (req, res) {
  var name = req.params.name
  res.render('login', { newName: name })
})
app.get('/posts', function (req, res) {
  var posts = [
    { title: 'Olu', rank: 'CEO' },
    { title: 'Ola', rank: 'MD' },
    { title: 'Wizzy', rank: 'Baba nla' },
  ]
  res.render('post', { posts: posts })
})
app.listen(3001, function () {
  console.log('Server is back')
})
