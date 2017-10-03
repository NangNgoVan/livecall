var express = require('express');
var router = express.Router();

var isLogin = require('../middlewares/islogin');

/* GET home page. */
router.get('/', isLogin(), function(req, res) {
  // res.render('home', { title: 'LiveCall', user: req.user });
});

module.exports = router;
