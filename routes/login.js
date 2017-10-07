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

//GET /auth/google
router.get('/auth/google', passport.authenticate('google',
  { scope: ['profile', 'email'] }));

//GET /auth/google/callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;