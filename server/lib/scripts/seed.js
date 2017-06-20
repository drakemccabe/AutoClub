var mongoose = require('mongoose'),
    data = require('./data'),
    app = require('../../index'),
    async = require('async');

var events = [];

// add events
var q = async.queue(function(event, callback) {
  mongoose.model('Event').create(event, function(err, createdEvent) {
    if(err) return callback(err);
    events.push(createdEvent);
    return callback(null, null);
  });

});

for(var i=0, l=data.events.length; i<l; i++) {
  q.push(data.events[i]);
}

q.drain = function() {

  q2 = async.queue(function(event, callback) {
    // add drivers to each event
    var count = 0;
    var rand = function() { return Math.random() * (70 - 3) + 3; };
    var limit = rand();

    async.whilst(
      function() { return count < limit; },
      function(callback) {
        mongoose.model('Driver').create({
          name: "test_driver_" + rand(),
          email: "test_driver_" + rand() + "@gmail.com",
          address: "02114",
          notes: [],
          car: "350z",
          addedBy: "DB_SEED",
          paymentRef: null,
          pricePaid: 0,
          event: event._id
        }, function(err, driver) {

          // Register driver addition to changelog
          mongoose.model('Change').create({
            date: new Date(),
            message: "Driver " + driver.name + " added by " + driver.addedBy,
            level: "INFO",
            event: event._id
          }, function(err, change) {
            event.drivers.push(driver);
            event.changeLog.push(change);
            event.save();
            count ++;
            return callback(null, null);
          });

        });
      }
    );
  });

  for(var c=0, len=events.length; c<len; c++) {
    q2.push(events[c]);
  }

  q2.drain = function() {
    console.log("Seed Complete");
  }
}

