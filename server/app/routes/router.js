var express = require('express'),
  router = express.Router(),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

//Any requests to this controller must pass through this 'use' function
router.use(bodyParser.urlencoded({ extended: true }))

router.use(methodOverride(function(req, res){

  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

module.exports = router;
