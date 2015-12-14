/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/users');

var regExpEmail = /\w+@\w+\.\w+/;

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET /users/id */
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* PUT /users/id */
router.put('/:id', function (req, res, next) {
    if (req.body.email) {
        if (regExpEmail.test(req.body.email)) {
            User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
                if (err) return next(err);
                res.json(user);
            });
        } else {
            return res.send("Erreur : Mauvais format d'adresse email.");
        }
    } else {
        return res.send("Erreur : Veuillez entrer une adresse email.");
    }

});

/* DELETE /users/:id */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

module.exports = router;
