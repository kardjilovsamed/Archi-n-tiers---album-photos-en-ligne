var express = require('express');
var passport = require('passport');

var router = express.Router();

var Album = require('../models/albums');
var Photo = require('../models/photos');

var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../photos')
    }
});

var upload = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
        var type = file.mimetype;
        var typeArray = type.split("/");
        if (typeArray[0] == "video" || typeArray[0] == "image") {
            cb(null, true);
        }else {
            cb(null, false);
        }
    }
});

router.post('/',
    passport.authenticate('bearer', { session: false }),
    upload.single('photos'), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

        if(req.file) {
            var photo = new Photo();
            photo.uri = req.file.path;
            return res.json(photo);
        } else {
            return res.json({message: "Veuillez choisir un fichier image ou video"});
        }
});

module.exports = router;