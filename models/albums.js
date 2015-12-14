/*jslint node: true */
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');

var AlbumSchema = new mongoose.Schema({
    nom: String,
    description: String,
    tags: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
