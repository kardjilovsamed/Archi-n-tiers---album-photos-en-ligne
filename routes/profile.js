var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    return res.json(req.user);
});

module.exports = router;