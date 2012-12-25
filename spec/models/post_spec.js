process.APP_ENV = "test";

var path   = require("path");
var should = require("should");
var sinon  = require("sinon");
var config = require(path.join(__dirname, "..", "..", "config", "application"));
var Post   = require(path.join(config.root, "application", "models", "post"));

describe("post", function() {
	describe("#all", function() {
		it("should find all posts", function(done) {
			Post.all(function(error, posts) {
				posts.length.should.equal(3);
				done();
			});
		});
	});

	describe("#find", function() {
		it("should find a post", function(done) {
			Post.find(1, function(error, post) {
				post.id.should.equal(1);
				done();
			});
		});
	});
});
