var mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost/autoclub',
      { server: { reconnectTries: 5 } });


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose Conn Disconnect SIGINT');
    process.exit(0);
  });
});
