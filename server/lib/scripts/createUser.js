// NOTE: use only for developement. Real user accounts should be created
// in mongo terminal. Do not store real passwords in version control.

var mongoose = require('mongoose');
var app = require('../../index');

var testUser = {
  email: "example@example.com",
  password: "example"
};

mongoose.model('User').create(testUser, function(err, user) {
  if(err) { throw err }
  process.exit();
});
