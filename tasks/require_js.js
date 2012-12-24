var requirejs = require("requirejs");

module.exports = function(grunt) {
	grunt.registerMultiTask("requirejs", "", function(config) {
		var callback = this.async();
		requirejs.optimize(this.data, function() {
			callback();
		}, function(error) {
			console.log(error);
			callback(false);
		});
	});
};
