// #IDGAF

var path         = require("path");
var http         = require("http");
var express      = require("express");
var config       = require(path.join(__dirname, "config", "application"));
var redis        = require(path.join(config.root, "application", "lib", "redis"));
var routes       = require(path.join(config.root, "application", "routes"));
var csrf         = require(path.join(config.root, "application", "lib", "csrf"));
var SessionStore = require(path.join(config.root, "application", "lib", "session_store"));
var CacheBuster  = require(path.join(config.root, "application", "lib", "cache_buster"));

var app = express();

// basic config
app.enable("trust proxy");
app.set("env", config.environment);

// view config
app.set("views", path.join(config.root, "application", "views"));
app.set("view engine", "jade");
app.locals.pretty = true;

// Initialize session
config.session.store = new SessionStore({ redis: redis });

// register middleware
app.use(express.logger("tiny"));
app.use(express.favicon());
app.use(express.cookieParser(config.session.secret));
app.use(express.session(config.session));
app.use(express.bodyParser());
app.use(express.csrf());
app.use(csrf);
app.use(app.router);
app.use(CacheBuster(app));

// Serve javascript files directly in non production mode
if (config.environment !== "production") {
	app.use(express.static(path.join(config.root, "application", "assets")));
}

app.use(express.static(path.join(config.root, "public")));
app.use(express.compress());
app.use(express.errorHandler());

// load routes
routes(app);

http.createServer(app).listen(config.port, function(error) {
	if (error) {
		console.log("Error:" + error);
	} else {
		console.log("app booted in", config.environment, "mode and listening on", + config.port);
	}
});
