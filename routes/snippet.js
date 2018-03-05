const express = require('express')
var users = require('./users')
const router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://PhilDelfia:jontetomte12@ds012188.mlab.com:12188/development')
// use model - Snippet.js
const Snippet = require('../models/Snippet')

// <--------- Read (GET) --------------->
router.get('/snippy', (req, res) => {
  Snippet.find({}, function (error, data) {
    let context = {
      snippet: data.map(function (snippet) {
        return {
          text: snippet.text,
          createdAt: snippet.createdAt,
          createdBy: snippet.createdBy,
          id: snippet._id
        }
      })
    }

    // console.log(context.createdBy)

    res.render('snippy', context)
  })
})
// <-------- Create (POST) ------------>
router.post('/snippy', (req, res) => {
  let text = req.body.text
  // Create object to save
  let snip = new Snippet({
    text: text,
    createdBy: req.session.user
  })
  snip.save().then(function () {
    // Successful
    res.redirect('/snippy')
  }).catch(function (err) {
    console.log(err.message)

    res.redirect('snippy')
  })
})
// <---------DELETE------------->
router.route('/snippy/delete/:id').get((req, res, next) => {
  console.log(req.session.user)
  if (req.session && req.session.user) {
    res.render('delete', {id: req.params.id})
    console.log(req.session.user)
  } else {
    res.render('Errors/401')
  }
})

  // if (req.session && req.session.user) {
    // res.render('delete', {id: req.params.id})
.post(function (req, res) {
  Snippet.findOneAndRemove({_id: req.params.id}, function (error, data) {
    if (error) {
      res.redirect('Errors/404')
      return
    }
    if (data.createdBy !== req.session.user) {
      res.render('delete', {id: req.params.id})
      return (res)
    } else {
      res.render('Errors/401')
      return (res)
    }
  })
  req.session.flash = { type: 'success', text: 'Snippet deleted' }
  res.redirect('/snippy')
})
// if (snippet.createdby !== req.session.user) { hantera deta här} (edited)

// <------------------ EDIT --------------------->
// router.route('/snippy/edit/:id').put((req, res, next) => {
//   if (req.session && req.session.user) {
//     res.render('edit', {id: req.params.id})

// )}

module.exports = router
