var express = require('express')
var router = express.Router()
var User = require('../models/users')

// Register
router.get('/register', function (req, res) {
  res.render('register')
})

// Register User
router.post('/register', function (req, res) {
  var username = req.body.username
  var password = req.body.password

 // Validation

  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()

  var errors = req.validationErrors()

  if (errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    var newUser = new User({
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
// Login
router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/login', function (req, res) {
  // req.checkBody('username', 'Username is required').notEmpty()
 //  req.checkBody('password', 'Password is required').notEmpty()
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      return res.status(400).send()
    } if (user === null) {
      // Error message are not flashing when user not find. WHY?
      req.flash('error_msg', 'ERROR USER DO NOT EXIST')
      res.render('login')
    } else {
      User.comparePassword(req.body.password, user.password, function (err, isMatch) {
        if (err) {
          return res.status(400).send()
        }
        if (isMatch === false) {
          req.flash('error_msg', 'ERROR USER DO NOT EXIST')
          res.render('login')
          console.log('Wrong password')
        }
        if (isMatch === true) {
          req.flash('success_msg', 'Logged in! Welcome.')
          res.redirect('snippy')
          console.log('you are the log in')
        }
        console.log('--------------->', req.session.user)
        // console.log(isMatch)
        // console.log(user.password)
      })
      req.session.user = user.username
    }
  })
})
router.get('/logout', function (req, res) {
  console.log(res)

  if (req.session) {
    console.log(req.session)
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next (err)
      } else {
        console.log(req.session)
        console.log('U logged out!')
        return res.redirect('/')
      }
    })
  }
})

module.exports = router
