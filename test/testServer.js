var express = require('express')
var app = express()

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
  this.location = ["Joe's Speedway", "Daytona", "Lime Rock Park"];
  this.firstName = ["John", "Steve", "Joe", "Ben", "Jake", "Pablo", "Ted", "Bill", "Aaron", "Chris", "Sean", "Jorge"];
  this.lastName = ["Jefferson", "Smith", "Johnson", "Paul", "Washington", "Hamilton"];
  this.admin = ["Admin1", "Admin2", "Admin3"];
  this.car = ["Nissan 240sx", "Nissan 350z", "Toyota AE86", "Mazda RX8", "Mazda RX7"];
  return this[type][Math.floor(Math.random() * this[type].length)];
}


function getDriver(num = 1, driverId = null) {
  var isManualAdd = Math.random() >= 0.5;
  var firstName = getRandom("firstName");
  return {
    _id: driverId || String(num),
    firstName: firstName,
    lastName: getRandom("lastName"),
    zipCode: "02379",
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
  num = num || 1;
  return {
    _id: eventId || String(num),
    date: getDate(num),
    location: getRandom("location"),
    advancePrice: 7500,
    doorPrice: 10000,
    registrationStartDate: getDate(0),
    registrationEndDate: getDate(num),
    facebookPage: "https://www.facebook.com",
    driverLimit: 40,
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
      drivers.push(getDriver(arr[i]));
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


app.listen(3000)
