var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
  activated: {type: Boolean, default: false},
  activate_digest: {type: String},
  created_at: Date,
  updated_at: Date
});

var bcrypt = require('bcrypt');
var RandomString = require('../helper/random-string');

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

/* activate account */

userSchema.pre('save', function(done) {
  var user = this;

  var currentDate = new Date();

  this.updated_at = currentDate;
  if(!this.created_at) this.created_at = currentDate;

  //create random activate_at string.
  var activeRandomString = RandomString(24);
  this.activate_digest = activeRandomString;
  
  bcrypt.genSalt(12, function(err, salt) {
  	if(err) return done(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
    	if(err) return done(err);
        // change hash in your password DB.
        user.password = hash;
        done();
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;