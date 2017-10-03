var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

var bcrypt = require('bcrypt');

userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

userSchema.pre('save', function(done) {
  var user = this;
  
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