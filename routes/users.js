var express = require('express')
var router = express.Router()
var User = require('../models/users')

// Register
router.get('/register', function (req, res) {
  res.render('register')
})

// Login
router.get('/login', function (req, res) {
  res.render('login')
})

// Register User
router.post('/register', function (req, res) {
  var email = req.body.email
  var username = req.body.username
  var password = req.body.password

 // Validation
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    var newUser = new User({
      email: email,
      username: username,
      password: password
    })

    User.createUser(newUser, function (err, user) {
      if (err) throw err
      console.log(user)
    })

    req.flash('success_msg', 'You are registered and can now login')

    res.redirect('/users/login')
  }
})
router.post('/users/login', function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (!user) {
      return res.status(400).send()
    }		else {
      console.log('Hello. u logged in!')
      res.redirect('/')
    }
  })
})
router.get('/logout', function (req, res) {
  if (req.session) {
		// delete session object
    req.session.destroy(function (err) {
		  if (err) {
    return next(err)
		  } else {
    return res.redirect('/')
		  }
  })
	  }
})

module.exports = router
