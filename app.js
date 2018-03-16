var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
var index = require('./routes/index');
app.use('/', index);

var users = require('./routes/users');
app.use('/users', users);

let portfolio = require('./routes/portfolio');
app.use('/portfolio', portfolio);

//End of routes

app.use(session({
  secret: 'be cool',
  resave: true,
  saveUninitialized: false
}));

//connect to database using mongoose
const mongoose = require('mongoose');
const dbURL = 'mongodb://mycointracker.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
mongoose.connect(dbURL, {
    auth: {
      user: 'mycointracker',
      password: 'bA7bOh3W8vJA4nw9dw8GvbIVpDIsbvS2WzoROWkkwS3yLp8BoaL0V2muzKPmTbSgaU87omBAwQmTspbN8OFqhw=='
    }
})
.then(() => console.log(`Connected to ${dbURL}`))
.catch((err) => console.error(err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
