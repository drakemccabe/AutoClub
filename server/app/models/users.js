/*
 * Module Dependencies
 */

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

SALT_WORK_FACTOR = 10;

/* USERS SCHEMA */
var userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});


userSchema.pre('save', function(next) {
   var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
          if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
    });
  });
});

userSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
  if (err) return cb(err);
    cb(null, isMatch);
  });
};

mongoose.model('User', userSchema);

