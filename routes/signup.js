var express = require('express');
var router = express.Router();

//user models
var User = require('../models/user');

//passport
var passport = require('passport');

//bcrypt
//var bcrypt = require('bcrypt');

//user model
var User = require('../models/user');

//mailer
var Mailer = require('../mailer/mailer');

/* POST signup. */
router.post('/', function(req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var newPassword = req.body.password;

  /* save user handle. */
  User.findOne({email: email}, (err, user) => {
    if(err) return next(err);
    if(user) {
      req.flash("error", "User already exists");
      console.log('Error save!');
      return res.redirect('/');
    }

    /* create new user instance. */
    var newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: newPassword
    });

    /* save user. */
    newUser.save((err) => {
    	if(err) console.log(err);
    	console.log('save successed!');
      console.log(newUser.email);

      //send email.
      var text = 'Mời bạn kích hoạt tài khoản! mã kích hoạt của bạn là: ' + newUser.activate_digest;
      var url = req.hostname + "/account_activation/" + newUser.activate_digest + "-" + newUser.email;
      var mailOptions = {
        from: process.env.USER_EMAIL,
        to: newUser.email,
        subject: 'Kích hoạt tài khoản!',
        text: text,
        html: '<a href='+url+'>Kích hoạt tài khoản</a>'
      }

      Mailer.send(mailOptions);

      next();
    });
    // newUser.save(next);
    // res.redirect('/');
  });

}, passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect:'/',
	failureFlash: true
}));

module.exports = router;