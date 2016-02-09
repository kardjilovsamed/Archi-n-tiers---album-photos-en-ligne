var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');

var AlbumSchema = new mongoose.Schema({
    nom: String,
    description: String,
    tags: String,
    private: {type: Boolean, default: true},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentAlbum: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    permissions: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            email: String
        }
    ]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
