const Campground = require('../models/campground')

const getAllCampgrounds = async (req, res) => {
  try {
    Campground.find({}, function (err, allCampgrounds) {
      res.render('campgrounds/index', {
        campground: allCampgrounds,
        currentUser: req.user,
      })
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

const createNewCampground = async (req, res) => {
  var name = req.body.name
  var image = req.body.image
  var desc = req.body.description
  var author = {
    id: req.user._id,
    username: req.user.username,
  }
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author,
  }
  try {
    //Create a new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
      // newlyCreated.author.id = req.user._id
      // newlyCreated.author.username = req.user.username
      // newlyCreated.save()
      // console.log(newlyCreated)
      res.redirect('/campgrounds')
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

const getSingleCampground = (req, res) => {
  try {
    //find the campground with provided id
    Campground.findById(req.params.id)
      .populate('comments')
      .exec(function (err, foundCampground) {
        //render show template with that campground
        // console.log(foundCampground)
        res.render('campgrounds/show', { campfound: foundCampground })
      })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

const editCampground = (req, res) => {
  try {
    Campground.findById(req.params.id, function (err, foundCampground) {
      res.render('campgrounds/edit', { campfound: foundCampground })
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const updateCampground = (req, res) => {
  try {
    req.body.campground.body = req.sanitize(req.body.campground.body)
    //find the campground with provided id
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
      err,
      foundCampground,
    ) {
      if (err) {
        console.log(err)
        res.redirect('/campgrounds')
      } else {
        //render show template with that campground
        // console.log(foundCampground)
        res.redirect('/campgrounds/' + req.params.id)
      }
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}
const deleteCampground = (req, res) => {
  try {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err)
      } else {
        campground.remove()
        res.redirect('/campgrounds')
      }
    })
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

module.exports = {
  getAllCampgrounds,
  createNewCampground,
  getSingleCampground,
  editCampground,
  updateCampground,
  deleteCampground,
}
