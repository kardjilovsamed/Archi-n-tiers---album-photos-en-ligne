var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/users');
var Album = require('../models/albums');
var Photo = require('../models/photos');

// GET search/photos
router.get('/photos', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var query = {private: false};
    if(req.query.owner)
        query.owner = req.query.owner;
    if(req.query.tag)
        query.tags = {$regex: req.query.tag, $options: "i"};
    Photo.find(query, function(err, photos) {
        if (err) {
            res.statusCode = 401;
            return res.json(err);
        }
        res.json(photos);
    });
});

// GET search/users
router.get('/users', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    User.find({email: {$regex: req.query.email, $options: "i"}}, '_id email')
        .limit(5)
        .exec(function(err, users) {
        if (err) {
            res.statusCode = 401;
            return res.json(err);
        }
        res.json(users);
    });
});

module.exports = router;