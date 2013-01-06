var express = require("express");
var Async = require("async_runner");

var SessionStore = function(options) {
	this.redis = options.redis;
	this.namespace = options.namespace || "session";
	this.defaultExpiration = options.defaultExpiration || 60 * 60 * 24;
};

SessionStore.prototype = new express.session.Store();

SessionStore.prototype.get = function(sid, callback) {
	var key = this.namespace + ":" + sid;
	this.redis.get(key, function(error, data) {
		if (error) { return callback(error); }
		if (!data) { return callback(); }
		callback(null, JSON.parse(data));
	});
};

SessionStore.prototype.set = function(sid, session, callback) {
	var key = this.namespace + ":" + sid;
	var seconds;
	if (typeof session.cookie.maxAge === "number") {
		seconds = session.cookie.maxAge / 1000;
	} else {
		seconds = this.defaultExpiration;
	}
	this.redis.setex(key, seconds, JSON.stringify(session), callback);
};

SessionStore.prototype.destroy = function(sid, callback) {
	var key = this.namespace + ":" + sid;
	this.redis.del(key, callback);
};

SessionStore.prototype.length = function(callback) {
	var pattern = this.namespace + ":*";
	this.redis.keys(pattern, function(error, data) {
		if (error) { return callback(error); }
		callback(null, data.length);
	});
};

SessionStore.prototype.clear = function(callback) {
	var self = this;
	var pattern = this.namespace + ":*";
	this.redis.keys(pattern, function(error, data) {
		var async = new Async(callback);
		async.run(data, self.redis.del.bind(self.redis));
	});
};

SessionStore.prototype.on = function(key, callback) {
	this.redis.on(key, callback);
};

module.exports = SessionStore;
