/*jslint node: true */
"use strict";

var express = require('express');
var passport = require('passport');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photos/')
    }
});
var upload = multer({ storage: storage });
var router = express.Router();

var Album = require('../models/albums');

/* GET albums listing. */
router.get('/', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  Album.find(function(err, albums) {
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
        res.json(album);
    });
});

/* POST /albums */
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /albums/id/upload */
router.post('/:id/upload', passport.authenticate('bearer', { session: false }), upload.array('photos', 8), function (req, res, next) {
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        var owner = album.owner;

        res.json(album);
    });
});

/* PUT /albums/id */
router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body, function(err, album) {
        if (err) return next(err);
        res.json(album);

    });
});

/* DELETE /albums/:id */
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  Album.findByIdAndRemove(req.params.id, req.body, function (err, album) {
    if (err) return next(err);
    res.json(album);
  });
});

module.exports = router;
