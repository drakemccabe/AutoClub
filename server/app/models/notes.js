var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var noteSchema = new Schema({
  date: Date,
  content: String,
  author: {type: Schema.ObjectId, ref: "User"},
  event: {type: Schema.ObjectId, ref: 'Event'},
  driver: {type: Schema.ObjectId, ref: 'Driver'}
});

mongoose.model('Note', noteSchema);
