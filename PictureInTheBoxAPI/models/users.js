/*jslint node: true */
"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Album = require('./albums');

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    suggestions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }],
    token: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
