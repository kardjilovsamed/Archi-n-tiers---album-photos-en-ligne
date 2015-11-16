/*jslint node: true */
"use strict";

// API ROUTES -------------------

// get an instance of the router for api routes

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require("../config/token");

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({email: user.email, nom: user.nom, prenom: user.prenom },
            config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

module.exports = router;
