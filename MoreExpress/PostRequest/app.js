var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
var friends = ['Olu', 'ola', 'timi', 'tope']

app.get('/', function (req, res) {
  res.render('home')
})
app.post('/friends', function (req, res) {
  console.log(req.body)
  var newFriend = req.body.newFriend
  friends.push(newFriend)
  //   res.send('You have successfully added a friend')
  res.redirect('friends')
})
app.get('/friends', function (req, res) {
  res.render('friends', { friends: friends })
})

app.listen(3004, function () {
  console.log('Post Request server is on')
})
