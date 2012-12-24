var path = require("path");

var rootDir     = path.join(__dirname, "..");
var environment = process.env.APP_ENV || "development";
var port        = process.env.APP_PORT || 3000;

module.exports = {
	root: rootDir,
	environment: environment,
	port: port,
	session: {
		secret: "3f22b97793e73105d7efb5d71135058405a821ec"
	}
};
