var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/users');
var Album = require('../models/albums');
var Photo = require('../models/photos');

router.get('/images', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    if(req.query.user)
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        if(album.owner == req.user.id || (album.permissions && album.permissions.indexOf(req.user._id) > -1)) {
            res.json(album);
        } else {
            res.statusCode = 401;
            return res.json({message: "Vous n'avez pas accès à cet album."});
        }
    });
});

module.exports = router;