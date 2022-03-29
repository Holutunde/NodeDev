var mongoose = require('mongoose')

var Campground = require('./models/campground')
var Comment = require('./models/comment')

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
    // if (err) {
    //   console.log(err)
    // } else {
    //   console.log('All campgrounds removed')
    //   //Add a few campgrounds
    //   data.forEach(function (seed) {
    //     Campground.create(seed, function (err, campground) {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         console.log('Added a campground')
    //         //Create a comment
    //         Comment.create(
    //           {
    //             text: 'This place is dope',
    //             author: 'Tommy Shelby',
    //           },
    //           function (err, comment) {
    //             if (err) {
    //               console.log(err)
    //             } else {
    //               campground.comments.push(comment)
    //               campground.save()
    //               console.log('Created New Comments')
    //             }
    //           },
    //         )
    //       }
    //     })
    //   })
    // }
  })
}

module.exports = seedDB
