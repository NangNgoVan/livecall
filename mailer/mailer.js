var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_HOST,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS
  }
});


module.exports.send = function(mailOptions) {
	return transporter.sendMail(mailOptions, function(err, info){
	  if(err) {
		console.log(err);
	  } else {
		console.log('Email sent!');
	  }
  	});
};