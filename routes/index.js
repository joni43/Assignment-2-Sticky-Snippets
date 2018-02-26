var express = require('express')
var router = express.Router()

// Get Homepage
router.get('/', function (req, res) {
  res.render('index')
})

router.get('snippy/create', function (req, res) {
  res.render('/create')
})

module.exports = router
