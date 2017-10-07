var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//session
var session = require('express-session');
//flash message
var flash = require('connect-flash');

//env
require('dotenv').config();

//user
var User = require('./models/user');

//mongo client
var mongoose = require('mongoose');

var dbURL;
if(process.env.NODE_ENV === 'production') {
  dbURL = 'mongodb://'+process.env.DB_USER +':'+process.env.DB_PASS +'@ds161574.mlab.com:'+process.env.DB_PORT+'/'+process.env.DB_HOST;
}
else dbURL = "mongodb://localhost:27017/testdb";
console.log(dbURL);

mongoose.connect(dbURL, {useMongoClient: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!');
});

//passport-google-api
var passport = require('passport');
//login-local

//config passport.
var configPassport = require('./config/passportcfg');
configPassport();
//

var index = require('./routes/index');

//login router
var login = require('./routes/login');

//signup router
var signup = require('./routes/signup');

//account activation
var activationAccount = require('./routes/activation');

var app = express();

//use flash
app.use(flash());

//use session
app.use(session({
  secret: 'q12qawsErtvY678UILSNvcza12Ya',
  resave: true,
  saveUninitialized: true
}))

//passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);
app.use('/account_activation', activationAccount);

/* GET logout */
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

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
