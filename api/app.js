var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var indexRouter = require('./routes/index');
var postRouter = require('./routes/post');

var cors = require("cors");
const fileUpload = require('express-fileupload');

var app = express();

// mongodb
const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin:admin@ccapdev-database.xdgjy.mongodb.net/data';
mongoose.connect(uri,
  {useNewURLParser: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors());

// React render: !! Do not move this code. It needs to run before setting up the routes.
const ppath = path.join(__dirname, "/../client/build");
console.log(ppath);
app.use(express.static(ppath));
// End of react stuff

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// React entry point
// !!! This goes here. Do not move this code
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});


module.exports = app;
