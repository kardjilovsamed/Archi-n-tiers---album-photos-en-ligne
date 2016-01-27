/*jslint node: true */
"use strict";

var mongoose = require("mongoose");
var passwordHash = require("password-hash");
var Schema = mongoose.Schema;
var Album = require('./albums');

//var bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    suggestions: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    albumRoot: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album'
    }],
    token: String
});


UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    user.password = passwordHash.generate(user.password);
    next();
/*// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});*/


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    cb(null, passwordHash.verify(candidatePassword, this.password));
    /*bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });*/
};

var User = mongoose.model('User', UserSchema);

module.exports = User;