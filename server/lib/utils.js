var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken');

var utils = {
  authorize: function(req) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
     jwt.verify(token, process.env.NODE_JWT_TOKEN, function(err, decoded) {
       if (err) {
         if(err.name == "TokenExpiredError") {
           return { success: false, message: 'reauthenticate' };
         } else {
           return { success: false, message: 'invalid' };
         }
       } else {
         return { success: true, message: 'validated' };
       }
     });
    } else {
      return { success: false, message: 'Missing Auth Token' };
    }

  },
  logChange: function(message, level, eventId, callback) {

    mongoose.model('Change').create({
      message: message,
      level: level,
      date: new Date(),
      event: eventId
    }, function(err, change) {

      if(err) {};

      mongoose.model('Event').update(
        { _id: eventId },
        { $push: { changeLog: change } },
      function(err, event) {

        if(err) {};

        return callback(null, null);

      });

    });

  }
}

