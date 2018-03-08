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
    return res.render('snippy', context)
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
    return res.redirect('/snippy')
  }).catch(function (err) {
    console.log(err.message)
    
    res.redirect('snippy')
  })
})
// <--------------DELETE--------------------------->
router.get('/snippy/delete/:id', (req, res, next) => {
  if (req.session && req.session.user) {
    res.render('delete', {id: req.params.id})
  } else {
    res.render('Errors/401')
  }
})

router.post('/snippy/delete/:id', (req, res) => {
  Snippet.findOne({_id: req.params.id}, function (error, data) {
    if (error) {
      res.render('Errors/404')
    }
    if (data.createdBy === req.session.user) {
      Snippet.findOneAndRemove({_id: req.params.id}).then(function () {
        req.session.flash = { type: 'success', text: 'Snippet deleted' }
        res.redirect('/snippy')
      })
    } else {
      res.render('Errors/403')
    }
  })
})
// // <------------------ EDIT --------------------->
router.get('/snippy/edit/:id', (req, res, next) => {
  if (req.session.user) {
    Snippet.findOne({_id: req.params.id}, function (error, data) {
      if (error) {
        console.log(error)
      }
      if (req.params.id) {
        res.render('edit', {
          id: data._id,
          text: data.text
        })
      }
    })
  } else {
    console.log('not logged in')
  }
})
router.post('/snippy/edit/:id', (req, res) => {
  let text = req.body.text
  if (text.length > 0) {
    Snippet.findByIdAndUpdate(req.params.id, {
      text: text,
      createdAt: Date.now()
    }, {new: true}).exec()
    .then((snippet) => {
      return res.redirect('/snippy')
    })
    .catch(error => {
      console.log(error)
      res.render('Errors/500')
    })
    console.log('B', text)
  } else {
    req.session.flash = { type: 'danger', text: 'Cant have an empty Snippet!' }
  }
})

module.exports = router
