const express = require('express')
const router = express.Router()
const User = require('../models/user')

// REGISTER
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
      // var email = req.body.email;
    var username = req.body.username
      var password = req.body.password
      // var password2 = req.body.password2;
  
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
      newUser.save(function(error) {
        if(error){
        // Handle the error
        }
      })
  
      User.createUser(newUser, function (err, user) {
        if (err) throw err
        console.log(user)
      })
  
      req.flash('success_msg', 'You are registered and can now login')
  
      res.redirect('/login')
    }
  })

  module.exports = router

