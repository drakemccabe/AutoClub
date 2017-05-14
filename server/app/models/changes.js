var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var changeSchema = new Schema({
  date: Date,
  message: String,
  level: String,
  event: {type: Schema.ObjectId, ref: 'Event'}
});

mongoose.model('Change', changeSchema);

