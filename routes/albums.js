var express = require('express');
var passport = require('passport');

var router = express.Router();

var Album = require('../models/albums');
var Photo = require('../models/photos');

/* GET albums listing. */
router.get('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  Album.find({owner: req.user.id}, function(err, albums) {
    if (err) return next(err);
    res.json(albums);
  });
});

/* GET /albums/id */
router.get('/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        res.json(album);
    });
});

/* GET /albums/id/content */
router.get('/:id/content', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        var content = {current: album};
        Photo.find({album: req.params.id}, function(err, photos) {
            if (err) return next(err);
            content.photos = photos;
            Album.find({parentAlbum: req.params.id}, function(err, albums) {
                if (err) return next(err);
                content.albums = albums;
                return res.json(content);
            });
        });
    });
});

/* POST /albums */
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    req.body.owner = req.user.id;
    req.body.parentAlbum = req.user.albumRoot;
    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /albums/id */
router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body, function(err, album) {
        if (err) return next(err);
        res.json(album);

    });
});

/* POST /albums/id */
router.post('/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findById(req.params.id, req.body, function(err, album) {
        if (err) return next(err);
        res.json(album);

    });
});

/* DELETE /albums/:id */
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  Album.findByIdAndRemove(req.params.id, function (err, album) {
    if (err) return next(err);
    res.json(album);
  });
});

module.exports = router;
