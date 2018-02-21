
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = require('./routes/index')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')

// Setup view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router)


// listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log('just work')
})

// Setup mongoose DB
mongoose.connect('mongodb://PhilDelfia:jontetomte12@ds012188.mlab.com:12188/development')

