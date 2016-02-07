var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');
var Album = require('./albums');

var PhotoSchema = new mongoose.Schema({
    tags: String,
    uri: String,
    url: String,
    urlThumb: String,
    private: {type: Boolean, default: true},
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
