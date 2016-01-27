/**
 * Created by Aurelien on 27/01/2016.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = require('./users');
var Client = require('./clientOauth');

var AccessTokenSchema = new Schema({
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

var AccessTokenModel = mongoose.model('AccessToken', AccessTokenSchema);

module.exports = AccessTokenModel;