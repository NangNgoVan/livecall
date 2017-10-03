var express = require('express');
var router = express.Router();

//user models
var User = require('../models/user');

//passport
var passport = require('passport');

/* POST login. */
router.post('/', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

module.exports = router;