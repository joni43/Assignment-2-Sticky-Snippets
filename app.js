var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
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

// Helmet
var helmet = require('helmet')

var db = mongoose.connection
// Init App
var app = express()
// Helmet. Protect from XXS attack.
app.use(helmet.noCache())
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
  name: 'jontesCookie',
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
app.use((req, res, next) => {
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

//
app.use('/', routes, users, snippet)
app.use('/users', users)

// Error handler.
app.use(express.static(path.join(__dirname, 'Errors')))
app.use(function (req, res) {
  res.send('404.: Page not Found', 404)
})
app.use(function (req, res) {
  res.send('500.: internal error', 500)
})
// --------------------------- Start APP 4000---------------------------------------
// Set Port
app.listen(process.env.PORT || 2000, function () {
  console.log('Connected! Well done...')
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
