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

router.use('/users', require('./users'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/upload', require('./upload'));
router.use('/profile', require('./profile'));
router.use('/search', require('./search'));

module.exports = router;
