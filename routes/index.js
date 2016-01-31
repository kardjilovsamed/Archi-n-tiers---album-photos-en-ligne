var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require("../config/token");
var oauth2 = require('../config/oauth2');
var passport            = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('../views/index.html');
});

/* GET home page. */
router.get('/a', function(req, res, next) {
    res.render('../views/login.html');
});

/* GET home page. */
router.get('/b', function(req, res, next) {
    res.render('../views/jQuery-File-Upload-9.11.2/jquery-ui.html');
});

router.use('/signup', require('./signup'));

router.post('/authenticate', oauth2.token);

//router.use('/authenticate', require('./authenticate'));

// route middleware to verify a token
/*router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] || req.query.token || req.body.token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});*/

// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
//From here on you need to be authenticated
// /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/upload', require('./upload'));

router.get('/profile', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    return res.json(req.user);
});

/*router.get('/img/', function(req, res) {

});*/

module.exports = router;
