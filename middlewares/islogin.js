module.exports = function() {
  return function(req, res, next) {
  	if(req.isAuthenticated()) {
  	  next();
  	}
  	else {
  	  req.flash('info', 'Bạn chưa đăng nhập!');
  	  res.redirect('/');
  	}
  }
}