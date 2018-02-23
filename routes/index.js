const express = require('express')
const router = express.Router()
const User = require('../models/user')
// const Snippet = require('../models/snippet')
// get a list of ninjas from the db

router.get('/', function (req, res) {
  res.render('home', {title: 'STARTPAGE NR 1'})
})

router.get('snippy/create', function (req, res) {
  res.render('/create')
})

module.exports = router
