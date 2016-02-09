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
        if(album.owner == req.user.id || (album.permissions && hasPermission(album.permissions, req.user._id) > -1)) {
            res.json(album);
        } else {
            res.statusCode = 401;
            return res.json({message: "Vous n'avez pas accès à cet album."});
        }
    });
});

/* GET /albums/id/content */
router.get('/:id/content', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    Album.findById(req.params.id, function(err, album) {
        if (err) return next(err);
        if(album.owner == req.user.id || (album.permissions && hasPermission(album.permissions, req.user._id) > -1)) {
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
        } else {
            res.statusCode = 401;
            return res.json({message: "Vous n'avez pas accès à cet album."});
        }
    });
});

/* POST /albums */
router.post('/', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    req.body.owner = req.user.id;
    Album.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /albums/id */
router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res, next) {
    var query = req.body;
    if(req.body.permissions) {
        query.permissions = JSON.parse(req.body.permissions);
    }

    Album.findOneAndUpdate({'_id': req.params.id, owner: req.user.id}, query, {new: true}, function(err, album) {
        if (err) return next(err);
        if(album) {
            return res.json(album);
        } else {
            res.statusCode = 400;
            return res.json({message: "Partage loupe :p"});
        }
    });
});

/* DELETE /albums/:id */
router.delete('/:id', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  Album.findOneAndRemove({'_id': req.params.id, owner: req.user.id}, function (err, album) {
    if (err) return next(err);
      if(album) {
          return res.json(album);
      } else {
          res.statusCode = 401;
          return res.json({message: "Suppression loupee :p"});
      }
  });
});


function hasPermission(users, id) {
    var i;
    users.some(function (user, index, usersList) {
        if(user.id.equals(id)) {
            i = index;
            return true;
        }
    });
    if(i > -1)
        return i;
    else
        return -1;
}


module.exports = router;
