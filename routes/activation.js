var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

var passport = require('passport');


router.get('/', function(req, res, next){
   res.render('index', { title: 'LiveCall'});
});

router.get('/:activate_token-:email', function(req, res, next){

  var activate_digest = req.params.activate_token;
  var email = req.params.email;

  // res.send(activate_digest+" "+email);
  User.findOneAndUpdate({email: email, activate_digest: activate_digest}, {activated: true},function(err, user){
    if(err) {
    	res.send('Lỗi hệ thống.');
    	return;
    }
    if(!user) {
    	res.send('Dữ liệu không chính xác!');
    	return;
    }
    next();
  });
}, passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect:'/',
	failureFlash: true
}));

module.exports = router;