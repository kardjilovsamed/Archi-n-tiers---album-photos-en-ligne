var express = require('express');
var passport = require('passport');

var Album = require('../models/albums');

var router = express.Router();

router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {
    return res.json(req.user);
});

router.get('/partage', passport.authenticate('bearer', { session: false }), function (req, res) {
    Album.find({"permissions.id": req.user._id, "permissions.email": req.user.email}, function(err, albums) {
        if(err) {
            res.statusCode = 400;
            return res.json(err);
        }
        return res.json(albums);
    });

});

module.exports = router;