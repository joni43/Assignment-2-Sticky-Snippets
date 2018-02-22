const express = require('express')
const router = express.Router()
const User = require('../models/user')
// const Snippet = require('../models/snippet')
// get a list of ninjas from the db

router.get('/', function(req, res) {
res.render('home', {title: 'STARTPAGE NR 1'})
})


router.get('/register', function (req, res) {

res.render('register', {title: 'ASSMUNCH'})
    //res.send({type: 'GET'})
})
  // add a account/password to the db
  router.post('/register', function (req, res) {
    // varibels get value of the body page.
    let newUsername = req.body.username;
    let newPassword = req.body.password;

    let user = new User(req.body)
    user.newUsername
    user.newPassword
      user.save(function(error) {
        if(error){
        // Handle the error
        }
      })

  })
    // update an account in the db
  // router.put('/ninjas/:id', function (req, res) {
  //   res.send({type: 'PUT'})
  // })
  // // delete a ninja from the db
  // router.delete('/ninjas/:id', function (req, res) {
  //   res.send({type: 'DELETE'})
  // })

  module.exports = router
