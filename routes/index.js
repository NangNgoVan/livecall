var express = require('express');
var router = express.Router();

/* GET intro page. */
router.get('/', function(req, res, next) {
  if(!req.user)
    res.render('index', { title: 'LiveCall', user: req.user });
  else res.render('home', { title: 'LiveCall', user: req.user });;
});

module.exports = router;
