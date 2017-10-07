var express = require('express');
var router = express.Router();

/* GET intro page. */
router.get('/', function(req, res, next) {
  if(!req.user) {
    res.render('index', { title: 'LiveCall', message: req.flash('error')});
  } else {
  	res.render('home', { title: 'LiveCall', user: req.user, sessionid: req.session.id, message: req.flash('error') });
  }
});

module.exports = router;
