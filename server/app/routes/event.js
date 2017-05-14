var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

router.route('/events').get(function(req, res, next) {

  mongoose.model('Event').find({})
    .populate("changeLog drivers")
    .maxTime(500)
    .lean()
    .exec(function(err, events) {

      if(err) {
        return res.json({ status: "error" });
      } else {
        return res.json(
          {
            status: {
              code: 200,
              message: "Success"
            },
            count: 1,
            type: "Event",
            results: events
          }
        );
      }

  });

});

module.exports = router;
