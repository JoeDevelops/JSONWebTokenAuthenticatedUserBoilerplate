var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sanitizer = require('express-sanitizer');
var helmet = require('helmet');

// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = express();

// JSON Web Tokens for Authentication
var jwtConfig = require('./config/jwtConfig');
app.set('jwtTokenSecret', jwtConfig.jwtSecret);

// View Engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sanitizer());
app.use(helmet());

// Routing
var index = require('./routes/index');
var auth = require('./routes/auth');
p
app.use('/api', index);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({'error':'Page Not Found.'});
});

module.exports = app;
