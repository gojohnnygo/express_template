var path   = require("path");
var _      = require("lodash");
var config = require(path.join(__dirname, "..", "..", "config", "application"));
var mongo  = require(path.join(config.root, "application", "lib", "mongo"));

var Post = function(options) {
	_.extend(this, options);
};

Post.collectionName = "posts";

Post.all = function(callback) {
	mongo.collection(this.collectionName, function(error, collection) {
		if (error) { return callback(error); }
		collection.find({}).limit(25).toArray(function(error, docs) {
			if (error) { return callback(error); }
			// fake data
			docs = [
				{ id: 1, title: "foo", body: "body 1" },
				{ id: 2, title: "bar", body: "body 2" },
				{ id: 3, title: "baz", body: "body 3" }
			];
			return callback(null, docs.map(function(doc) { return new Post(doc); }));
		});
	});
};

Post.find = function(id, callback) {
	mongo.collection(this.collectionName, function(error, collection) {
		if (error) { return callback(error); }
		collection.find({ id: id }).limit(1).nextObject(function(error, doc) {
			if (error) { return callback(error); }
			// fake data
			doc = { id: id, title: "foo", body: "body" };
			return callback(null, new Post(doc));
		});
	});
};

Post.prototype.toJSON = function() {
	return {
		id: this.id,
		title: this.title,
		body: this.body
	};
};

module.exports = Post;
