var express = require('express'),
    filter = require('content-filter'),
    path = require('path'),
    cors = require('cors'),
    mongoose = require('mongoose');

var db = require('./config/initializers/database');

var drivers = require('./app/models/drivers'),
    users = require('./app/models/users'),
    changes = require('./app/models/changes'),
    events = require('./app/models/events');

var router = require('./app/routes/router');

var driverRoutes = require('./app/routes/driver'),
    eventRoutes = require('./app/routes/event');

var app = express();
app.set('db', mongoose);
app.locals.env = process.env;
app.use(filter());
var static = path.join(__dirname, 'public');
app.use(express.static(static, { etag: false, maxage: 86400000 } ));
app.use(cors());

app.use("*", router);
app.use('/api', eventRoutes);

module.exports = app;
