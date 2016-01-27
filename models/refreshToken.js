/**
 * Created by Aurelien on 27/01/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');
var Client = require('./clientOauth');

var RefreshTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

var RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshTokenModel;