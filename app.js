
const express = require('express')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const router = require('./routes/index')
const users = require('./routes/users')
const snippet = require('./routes/snippet')
const app = express()
var expressValidator = require('express-validator')
const path = require('path')
const mongoose = require('mongoose')
const db = mongoose.connection
const session = require('express-session')
app.use(session({secret: 'your secret', saveUninitialized: true, resave: false}))



// View engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
// const port = process.env.PORT || 8000

// parse only urlencoded bodies. BodyParser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
// Express Session
app.use(session({
  secret: 'secret123',
  saveUninitialized: true,
  resave: true
}))
// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// connect Flash
app.use(flash())

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
// ------------------------------------------------------------------
// load the router module in the app
app.use('/', router, snippet, users)
// app.use('/', require('./routes/snippet.js'))

app.use((req, res) => res.status(404).render('error/404'))
// listen for requests
app.listen(process.env.PORT || 4000, function () {
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
