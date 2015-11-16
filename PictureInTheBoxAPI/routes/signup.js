/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();

var User = require('../models/users');

var regExpEmail = /\w+@\w+\.\w+/;

/* POST /users */
router.post('/', function (req, res, next) {
    if (req.body.email) {
        if (regExpEmail.test(req.body.email)) {
            User.create(req.body, function (err, post) {
                if (err) return next(err);
                res.json(post);
            });
        } else {
            return res.send("Erreur : Mauvais format d'adresse email.");
        }
    } else {
        return res.send("Erreur : Veuillez entrer une adresse email.");
    }
});

module.exports = router;
