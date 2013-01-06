var path    = require("path");
var config  = require(path.join(__dirname, "..", "..", "config", "application"));
var mongodb = require("mongodb");

var dbName = "foobar_" + config.environment;
var host   = config.mongodb.host || "127.0.0.1";
var port   = config.mongodb.port || 27017;
var server = new mongodb.Server(host, port, {});
var client =  mongodb.Db(dbName, server, { safe: true , strict: false });

module.exports = client;
