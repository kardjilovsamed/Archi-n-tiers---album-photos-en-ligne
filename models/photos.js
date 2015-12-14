/*jslint node: true */
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');
var Album = require('./albums');

var PhotoSchema = new mongoose.Schema({
    tags: String,
    uri: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }
});

var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
