var fs     = require("fs");
var path   = require("path");
var crypto = require("crypto");
var config = require(path.join(__dirname, "..", "..", "config", "application"));

module.exports = function(app) {
	var hashFile = function(filename) {
		return crypto.createHash("sha512").update(fs.readFileSync(path.join(config.root, filename))).digest("hex")
	}
	var javascriptUrl;
	var stylesheetUrl;
	var jsHash;
	var cssHash;
	if (config.environment === "production") {
		jsHash = hashFile("public/javascripts/application.js");
		cssHash = hashFile("public/stylesheets/application.css");
		javascriptUrl = app.locals.javascriptUrl = "/javascripts/" + jsHash + ".js";
		stylesheetUrl = app.locals.stylesheetUrl = "/stylesheets/" + cssHash + ".css";
	} else {
		app.locals.javascriptUrl = "/javascripts/vendor/require.js";
		app.locals.stylesheetUrl = "/stylesheets/application.css";
	}

	return function(request, response, next) {
		if (request.url === javascriptUrl) {
			request.url = "/javascripts/application.js";
		} else if (request.url === stylesheetUrl) {
			request.url = "/stylesheets/application.css";
		}
		next();
	};
}
