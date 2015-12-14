/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();

var Album = require('../models/albums');

/* GET albums listing. */
router.get('/', function(req, res, next) {
  Album.find(function(err, albums) {
    if (err) return next(err);
    res.json(albums);
  });
});

/* GET /albums/id */
router.get('/:id', function (req, res, next) {
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        res.json(album);
    });
});

/* POST /albums */
router.post('/', function (req, res, next) {
    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /albums/id */
router.put('/:id', function (req, res, next) {
    Album.findByIdAndUpdate(req.params.id, req.body, function(err, album) {
        if (err) return next(err);
        res.json(album);
    });
});

/* DELETE /albums/:id */
router.delete('/:id', function(req, res, next) {
  Album.findByIdAndRemove(req.params.id, req.body, function (err, album) {
    if (err) return next(err);
    res.json(album);
  });
});

module.exports = router;
