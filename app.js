var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var flash = require('connect-flash')
var path = require('path')
// ---- Express modules ----------
var express = require('express')
var session = require('express-session')
var exphbs = require('express-handlebars')
var expressValidator = require('express-validator')
// ------ Mongo ---------
var mongoose = require('mongoose')
var mongo = require('mongodb')
// ------- ROUTES------------
var routes = require('./routes/index')
var users = require('./routes/users')
const snippet = require('./routes/snippet')

var db = mongoose.connection
// Init App
var app = express()

// View engine
// View Engine
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// CSS file
app.use(express.static(path.join(__dirname, 'public')))

// Express Session
app.use(session({
  name: 'JontesCookie',
  secret: 'manhattan91',
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}))

// Express Validator.
app.use(expressValidator({

 }))

// Connect Flash
app.use(flash())

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

//
app.use('/', routes, users, snippet)
app.use('/users', users)

// --------------------------- Start APP 4000---------------------------------------
// Set Port
app.listen(process.env.PORT || 2000, function () {
  console.log('Connected! Well done...Neo')
})

// ---------------------------DATABASE------------------------------------------------
// connect to mongoose DB
mongoose.connect('mongodb://PhilDelfia:jontetomte12@ds012188.mlab.com:12188/development')

mongoose.Promise = global.Promise
// Listen for events
db.on('error', function () {
  console.log('We got a connection error!')
})
// When connected
db.once('open', function () {
  console.log('Sucesfully connect to mongoDB')
})


