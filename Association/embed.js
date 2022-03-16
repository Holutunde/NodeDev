var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog_demo')

//POST - title, content
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
})

var Post = mongoose.model('Post', postSchema)

//USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema],
})

var User = mongoose.model('User', userSchema)

var newUser = new User({
  email: 'Holushola@gmail.com',
  name: 'Tunde Sokunbi',
})

newUser.posts.push({
  title: 'How to beome big',
  content: 'She want to do lowkey',
})

newUser.save(function (err, user) {
  if (err) {
    console.log(err)
  } else {
    console.log(user)
  }
})

// var newPost = new Post({
//     title: "This is a new post!",
//     content: "Can you believe I just added this?",
// });

// newPost.save(function(err, post) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

// User.create({ email: 'Charlie@gmail.com', name: 'Charlie Brownn' }, function (
//   err,
//   user,
// ) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(user)
//   }
// })

User.findOne({ name: 'Tunde Sokunbi' }, function (err, user) {
  if (err) {
    // console.log(err)
  } else {
    console.log(user)
    user.posts.push({
      title: '3 Things I really hate',
      content: 'Voldmort, Voldmort, Voldmort',
    })
    user.save(function (err, user) {
      if (err) {
        console.log(err)
      } else {
        console.log(user)
      }
    })
  }
})
