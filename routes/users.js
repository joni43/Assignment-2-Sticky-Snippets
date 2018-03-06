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
    req.session.flash = { type: 'success', text: 'You are registered and can now login' }
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
    } if (!user) {
      // Error message are not flashing when user not find. WHY?
      req.session.flash = {
        type: 'danger', text: 'Incorrect username!'
      }
      res.redirect('/login')
    } else {
      User.comparePassword(req.body.password, user.password, function (err, isMatch) {
        if (err) {
          return res.status(400).send()
        } else if (isMatch === false) {
          req.session.flash = {
            type: 'danger', text: 'Incorrect password!'
          }
          res.redirect('/login')
        } if (isMatch === true) {
          req.session.flash = {
            type: 'success', text: 'Logged in!' 
          }
          req.session.user = user.username
          res.redirect('/snippy')
        }
        console.log('--------------->', req.session.user)
        // req.session.user = user.username
        // console.log(isMatch)
        // console.log(user.password)
      })
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
