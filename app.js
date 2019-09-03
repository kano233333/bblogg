var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var MongoStore = require('connect-mongo')(express);
var settings = require('./setting');
var Session = require('express-session');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var ejs = require('ejs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(Session({
  secret:settings.cookieSecret,
  ket:settings.db,
  cookie:{maxAge:1000*60*60*24*30},
  resave:false,
  saveUninitialized:true
  // store:new MongoStore({
  //   db:settings.db
  // })
}));


app.use('/', indexRouter);
app.use('/api', usersRouter);

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
  res.render('error');
});

module.exports = app;
