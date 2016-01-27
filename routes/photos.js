/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();

var Photo = require('../models/photos');

/* GET /photos/test */
router.get('/test', function(req, res, next) {
    var photos = {truc: "bidule"};
    res.json(photos);
});

/* GET photos listing. */
router.get('/', function(req, res, next) {
  Photo.find(function(err, photos) {
    if (err) return next(err);
    res.json(photos);
  });
});

/* GET /photos/id */
router.get('/:id', function (req, res, next) {
    Photo.findById(req.params.id, function(err, photo) {
        if (err) return next(err);
        res.json(photo);
    });
});

/* GET /photos/albumId */
router.get('/:allbumId', function (req, res, next) {
    Photo.findByAlbumId(req.params.album, function(err, photo) {
        if (err) return next(err);
        res.json(photo);
    });
});

/* POST /photos */
router.post('/', function (req, res, next) {
    Photo.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /photos/id */
router.put('/:id', function (req, res, next) {
    Photo.findByIdAndUpdate(req.params.id, req.body, function(err, photo) {
        if (err) return next(err);
        res.json(photo);
    });
});

/* DELETE /photos/:id */
router.delete('/:id', function(req, res, next) {
  Photo.findByIdAndRemove(req.params.id, req.body, function (err, photo) {
    if (err) return next(err);
    res.json(photo);
  });
});

module.exports = router;
