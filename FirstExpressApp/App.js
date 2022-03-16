var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hompage')
})

app.get('/dog', function (req, res) {
  console.log('Someone made a request')
  res.send('Dog')
})

//routes parameter
app.get('/r/:sub', function (req, res) {
  var name = req.params.sub
  res.send(`This is the ${name.toUpperCase()} parameter `)
})

app.get('/r/:sub/comments/:id/:title', function (req, res) {
  console.log(req.params)
  res.send('You are getting there')
})

app.get('*', function (req, res) {
  console.log('Someone made a wrong')
  res.send('Wrong way')
})

app.listen(3000, function () {
  console.log('Server has started')
})
