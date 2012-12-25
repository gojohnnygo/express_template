var path                  = require("path");
var config                = require(path.join(__dirname, "..", "config", "application"));
var applicationController = require(path.join(config.root, "application", "controllers", "application"));
var postsController       = require(path.join(config.root, "application", "controllers", "posts"));

module.exports = function(app) {
	app.get("/", applicationController.index);
	app.get("/posts", postsController.index);
	app.get("/posts/:id", postsController.show);
};
