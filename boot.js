var path    = require("path");
var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
var config  = require(path.join(__dirname, "config", "application"));
var mongo   = require(path.join(config.root, "application", "lib", "mongo"));

if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", function(worker, code, signal) {
		console.log("worker " + worker.process.pid + " died");
		cluster.fork();
	});
} else {
	mongo.open(function(error) {
		if (error) { throw error; }
		require("./application");
	});
}
