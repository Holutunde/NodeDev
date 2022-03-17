var mongoose = require('mongoose')
var Campground = require('./models/campground')

var data = [
  {
    name: 'Thomas Edission',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
    description: 'You are doing well',
  },
  {
    name: 'Steven Gerrard',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
    description: 'You are amazing',
  },
  {
    name: 'Frank Lampard',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
    description: 'You are doing great',
  },
  {
    name: 'Thierry Henry',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgz2Bsvc_-JTfljr-Wjgrss9YWrxVZpJ8o-w&usqp=CAU',
    description: 'You are doing extra ordinary',
  },
]
const seedDB = () => {
  //Remove all campgronds
  Campground.deleteMany({}, function (err) {
    if (err) {
      console.log(err)
    } else {
      console.log('All campgrounds removed')
      //Add a few campgrounds
      data.forEach(function (seed) {
        Campground.create(seed, function (err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log('Added a campground')
          }
        })
      })
    }
  })
}

module.exports = seedDB
