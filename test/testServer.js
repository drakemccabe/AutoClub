var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.use(function (req, res, next) {
  // Simulate real DB reads or network latency
  setTimeout(function() { next(); }, 0);
})

function getDate(num) {
  var d = new Date();
  return d.setDate(d.getDate() + num);
}

function getRandom(type) {
  var number = Math.round(Math.random() * 100);
  var price =  Math.round(Math.random() * (10000 - 75000) + 75000);
  this.price = [price];
  this.number = [number];
  this.location = ["New Hampshire MotorSpeeday", "Daytona International Speedway", "Lime Rock Park", "Nurburgring", "Mazda Raceway Laguna Seca", "Circuit de la Sarthe"];
  this.firstName = ["George", "John", "Thomas", "James", "Andrew", "Martin", "William", "Zachary", "Franklin", "Grover", "Benjamin"];
  this.lastName = ["Washington", "Adams", "Jefferson", "Polk", "Jackson", "Van Buren", "Tyler", "Taylor", "Pierce", "Johnson", "Garfield"];
  this.admin = ["Richard Petty", "Jeff Gordon", "Mario Andretti", "Danica Patrick"];
  this.car = ["Nissan 240sx", "Nissan 350z", "Toyota AE86", "Mazda RX8", "Mazda RX7", "BMW E30", "BMW 325i"];
  return this[type][Math.floor(Math.random() * this[type].length)];
}


function getDriver(num = 1, driverId = null) {
  var isManualAdd = Math.random() >= 0.5;
  var firstName = getRandom("firstName");
  return {
    id: String(driverId),
    firstName: firstName,
    lastName: getRandom("lastName"),
    zipCode: "02323",
    emailAddress: firstName + "@example.com",
    car: getRandom("car"),
    isManualAdd: isManualAdd,
    addedBy: isManualAdd ? getRandom("admin") : null,
    pricePaid: getRandom("price"),
    referenceId: isManualAdd ? getRandom("number") : null,
    dateAdded: getDate(num - 2)
  }
}

function getEvent(num, drivers, eventId = null) {
  return {
    name: "TestEvent",
    id: eventId || String(num),
    date: getDate(num),
    location: getRandom("location"),
    advancePrice: 7500,
    doorPrice: 10000,
    registrationStartDate: getDate(0),
    registrationEndDate: getDate(num),
    facebookPage: "https://www.facebook.com",
    isPartOfBundle: false,
    bundleRef: [],
    bundleDiscount: 0,
    driverLimit: 40,
    driverLimitReached: false,
    driverCount: drivers.length,
    drivers: drivers
  }
}

function getEventWithDrivers(numEvents, numDrivers, id = null) {
  if(numDrivers == null) {
    numDrivers = Math.random() * (10-1) + 1;
  }
  if(numEvents == 0) {
    var drivers = [];
    for(var d=0, len=numDrivers; d<len; d++) {
      drivers.push(getDriver(d, id));
    }
    return drivers;
  }
  var events = [];
  var arr = Array.apply(null, {length: numEvents }).map(Number.call, Number);
  for(var i=0, l=arr.length; i<l; i++) {
    var drivers = [];
    for(var d=0, len=numDrivers; d<len; d++) {
      drivers.push(getDriver(arr[i], d));
    }
    events.push(getEvent(arr[i], drivers, id));
  }
  return events;
}

function getPostObject(obj, query) {
  var errors = [];
  for(key in obj) {
    if(typeof(query[key]) == "undefined") {
      errors.push(key + " cannot be blank");
    }
  }
  return errors;
}

function getResponseObject(status, response, type, message = null) {
  if(message == null) {
    message = status == 200 ? "success": "failure";
  }
  var res = {};
  res.status = {};
  res.status.code = status;
  res.status.message = message;
  res.count = response.length;
  res.type = type;
  res.results = response || [];
  return res;
}

app.get('/api/events', function (req, res) {
  var drivers = req.query.drivers == 1 ? null:0;
  var eventCount = parseInt(req.query.eventCount) || 5;
  res.status(200);
  var response = getResponseObject(200, getEventWithDrivers(eventCount, drivers), "Event");
  res.json(response);
})


app.get('/api/events/:id', function(req, res) {
  var drivers = req.query.drivers;
  res.json(
    getResponseObject(200, getEventWithDrivers(1, drivers, req.params.id), "Event")
  );
});


app.get('/api/drivers/', function(req, res) {
  res.json(
    getResponseObject(200, getEventWithDrivers(0, req.query.drivers), "Driver")
  );
});


app.get('/api/drivers/:id', function(req, res) {
  res.json(
    getResponseObject(200, getEventWithDrivers(0, 1, req.params.id), "Driver")
  );
});


app.get('/fetch/events/:id', function(req, res) {
  var event1 = getEventWithDrivers(1, 0, req.params.id);
  var event2 = getEventWithDrivers(1, 0, String(parseInt(req.params.id) + 1));
  var event3 = getEventWithDrivers(1, 0, String(parseInt(req.params.id) - 1));
  var obj = {}
  obj.event = event1[0];
  obj.bundled = [event2[0], event3[0]];
  res.json(
    getResponseObject(200, [obj])
  );
});


app.post('/api/drivers', function(req, res) {
  var errors = getPostObject(getDriver(), req.query);
  if(errors.length < 1) {
    res.json(
      getResponseObject(200, [req.query])
    );
  } else {
    res.json(
      getResponseObject(422, [], "Driver", errors.join(", "))
    );
  }
});

app.post('/api/events', function(req, res) {
  var errors = getPostObject(getEvent(), req.query);
  if(errors.length < 1) {
    res.json(
      getResponseObject(200, [req.query])
    );
  } else {
    res.json(
      getResponseObject(422, [], "Event", errors.join(", "))
    );
  }
});


//TODO
// event delete (return 200 and deleted entity)
// event update (return copy of entity)
// event new (return blank object)
// driver delete
// driver update
// driver new


app.listen(8989)
