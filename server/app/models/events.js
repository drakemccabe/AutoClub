var mongoose = require('mongoose'), Schema = mongoose.Schema; var eventSchema = new Schema({
  name: String, description: String,
  location: String,
  price: Number,
  image: String,
  facebookUrl: String,
  date: Date,
  regOpenDate: Date,
  regCloseDate: Date,
  driverLimit: Number,
  regIsOpen: Boolean,
  signUpIsVisible: Boolean,
  createdBy: String,
  drivers: [{type:Schema.ObjectId, ref:'Driver'}],
  changeLog: [{type:Schema.ObjectId, ref:'Change'}]
},
  { timestamps: true }
);

eventSchema.pre('save', function(next) {
  if(!this.isNew) return next();
  var event = this;

  mongoose.model('Change').create({
    date: new Date(),
    message: "Event created by " + event.createdBy,
    level: "INFO",
    event: event._id
  }, function(err, change) {

    event.changeLog.push(change);
    event.save();
    next();

  });

});

mongoose.model('Event', eventSchema);




