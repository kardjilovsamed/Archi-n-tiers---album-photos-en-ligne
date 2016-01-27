var express = require('express');
var router = express.Router();

var User = require('../models/users');
var Album = require('../models/albums');

var regExpEmail = /\w+@\w+\.\w+/;

/* POST /users */
router.post('/', function (req, res) {
    if (req.body.email) {
        User.findOne({email: req.body.email}, function(err, user) {
            if (err) return res.statusCode = 400;
            if(user) {
                res.statusCode = 400;
                return res.send("Erreur : utilisateur déjà existant");
            } else {
                if (regExpEmail.test(req.body.email)) {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.email = req.body.email;
                    newUser.password = req.body.password;
                    //newUser.save();

                    var albumRoot = new Album();
                    albumRoot.nom = "root";
                    albumRoot.description = "Dossier racine";
                    albumRoot.owner = newUser.id;
                    albumRoot.save();

                    newUser.albumRoot = albumRoot.id;

                    newUser.save();

                    return res.json(newUser);
                } else {
                    res.statusCode = 400;
                    return res.send("Erreur : Mauvais format d'adresse email.");
                }
            }
        })
    } else {
        res.statusCode = 400;
        return res.send("Erreur : Veuillez entrer une adresse email.");
    }
});

module.exports = router;
