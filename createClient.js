var mongoose = require("mongoose");
var database = require("./config/db");

mongoose.connect(database.url, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var ClientModel = require('./models/clientOauth');

ClientModel.remove({}, function(err) {
    var client = new ClientModel({
        name: "Client web Picture In The Box",
        clientId: "webClient",
        clientSecret:"secret" });
    client.save(function(err, client) {
        if(err) return console.log(err);
        else console.log("New client - %s:%s",client.clientId,client.clientSecret);
    });
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);