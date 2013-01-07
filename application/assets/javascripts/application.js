define(function(require) {
	require("handlebars");
	require("handlebarsExtensions");

	var PostsController = require("controllers/posts");

	if (window.location.pathname === "/posts") {
		new PostsController().setupBindings();
	}
});
