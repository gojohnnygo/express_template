var Browser = require("zombie");
var should = require("should");

describe("posts", function() {
	describe("index page", function() {
		it("renders the page", function(done) {
			var browser = new Browser();
			browser.
				visit("http://localhost:3000/posts").
				then(function() {
					browser.statusCode.should.equal(200);
					browser.text("h1:first").should.equal("All posts");
					browser.text(".post-body:first").should.equal("body 1");
				}).
				then(done, done);
		});
	});

	describe("show page", function() {
		it("renders the page", function(done) {
			var browser = new Browser();
			browser.
				visit("http://localhost:3000/posts/1").
				then(function() {
					browser.statusCode.should.equal(200);
					browser.text(".title").should.equal("foo");
					browser.text(".body").should.equal("body");
				}).
				then(done, done);
		});
	});
});
