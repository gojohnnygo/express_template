var path = require("path");
var config = require(path.join(__dirname, "..", "config", "application"));

module.exports = function(app) {
	app.get("/", function(request, response) {
		response.render("index");
	});
};
