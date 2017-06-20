var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var driverSchema = new Schema({
  name: String,
  email: String,
  address: String,
  notes: [{type:Schema.ObjectId, ref: 'Note'}],
  car: String,
  addedBy: String,
  paymentRef: String,
  pricePaid: Number,
  event: {type:Schema.ObjectId, ref: 'Event'}
},
  { timestamps: true }
);

mongoose.model('Driver', driverSchema);

