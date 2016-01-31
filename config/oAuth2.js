var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');
var config              = require('./token');
var UserModel           = require('../models/users');
var ClientModel         = require('../models/clientOauth');
var AccessTokenModel    = require('../models/accessToken');
var RefreshTokenModel   = require('../models/refreshToken');

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password(function(client, email, password, scope, done) {
    UserModel.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false); }

        RefreshTokenModel.remove({ userId: user.id, clientId: client.id }, function (err) {
            if (err) return done(err);
        });
        AccessTokenModel.remove({ userId: user.id, clientId: client.id }, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessTokenModel({ token: tokenValue, clientId: client.id, userId: user.id });
        var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.id, userId: user.id });
        refreshToken.save(function (err) {
            if (err) { return done(err); }
        });
        var info = { scope: '*'};
        token.save(function (err, token) {
            if (err) { return done(err); }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': config.tokenLife });
        });
    });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        if (!token) { return done(null, false); }

        UserModel.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            RefreshTokenModel.remove({ userId: user.id, clientId: client.id }, function (err) {
                if (err) return done(err);
            });
            AccessTokenModel.remove({ userId: user.id, clientId: client.id }, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('hex');
            var refreshTokenValue = crypto.randomBytes(32).toString('hex');
            var token = new AccessTokenModel({ token: tokenValue, clientId: client.id, userId: user.id });
            var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.id, userId: user.id });
            refreshToken.save(function (err) {
                if (err) { return done(err); }
            });
            var info = { scope: '*' };
            token.save(function (err, token) {
                if (err) { return done(err); }
                done(null, tokenValue, refreshTokenValue, { 'expires_in': config.tokenLife });
            });
        });
    });
}));

// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];
