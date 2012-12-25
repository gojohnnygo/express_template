process.APP_ENV = "test";

var path            = require("path");
var should          = require("should");
var sinon           = require("sinon");
var config          = require(path.join(__dirname, "..", "..", "config", "application"));
var postsController = require(path.join(config.root, "application", "controllers", "posts"));

describe("posts controller", function() {
	describe("index action", function() {
		it("renders the index template", function(done) {
			var request = null;
			var response = {render: function() {} };
			var next = null;
			var mockResponse = sinon.mock(response);
			mockResponse.expects("render").once().withArgs("posts/index");
			postsController.index(request, response, next);
			setTimeout(function() {
				mockResponse.verify();
				done();
			}, 0);
		});
	});

	describe("show action", function() {
		it("renders the show template", function(done) {
			var request = {params: { id: 1 }};
			var response = {render: function() {} };
			var next = null;
			var mockResponse = sinon.mock(response);
			mockResponse.expects("render").once().withArgs("posts/show");
			postsController.show(request, response, next);
			setTimeout(function() {
				mockResponse.verify();
				done();
			}, 0);
		});
	});
});
