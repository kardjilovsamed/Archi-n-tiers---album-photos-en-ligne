var mongoose = require("mongoose");
var passwordHash = require("password-hash");
var Schema = mongoose.Schema;
var Album = require('./albums');

var UserSchema = new mongoose.Schema({
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
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    cb(null, passwordHash.verify(candidatePassword, this.password));
};

UserSchema.methods.checkPassword = function(candidatePassword) {
    return passwordHash.verify(candidatePassword, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
