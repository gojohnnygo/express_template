var path   = require("path");
var config = require(path.join(__dirname, "..", "..", "config", "application"));
var Post   = require(path.join(config.root, "application", "models", "post"));

var actions = {};

actions.index = function(request, response) {
	Post.all(function(error, posts) {
		if (error) { return response.send(500); }
		response.render("posts/index", { posts: posts.map(function(post) { return post.toJSON(); })});
	});
};

actions.show = function(request, response) {
	Post.find(request.params.id, function(error, post) {
		if (error) { return response.send(404); }
		response.render("posts/show", { post: post.toJSON() });
	});
};

module.exports = actions;
