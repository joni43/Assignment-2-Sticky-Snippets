
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = require('./routes/index')
const snippet = require('./routes/snippet')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const db = mongoose.connection
// const session = require('express-session')
//const MongoClient = require('mongodb').MongoClient

// Setup view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// const port = process.env.PORT || 8000

// parse only urlencoded bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ------------------------------------------------------------------
// load the router module in the app
app.use('/', router, snippet)

// listen for requests
app.listen(process.env.PORT || 4000, function () {
  console.log('just work')
})
// Listen for events
db.on('error', function () {
  console.log('We got a connection error!')
})
// When connected
db.once('open', function () {
  console.log('Sucesfully connect to mongoDB')
})
// connect to mongoose DB
mongoose.connect('mongodb://PhilDelfia:jontetomte12@ds012188.mlab.com:12188/development')
mongoose.Promise = global.Promise
