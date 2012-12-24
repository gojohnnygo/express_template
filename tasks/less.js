var less = require("less");

module.exports = function(grunt) {
	grunt.registerMultiTask("less", "", function(config) {
		var self = this;
		var callback = this.async();
		var parser = new less.Parser({ paths: this.data.paths });
		parser.parse(grunt.file.read(this.data.src), function(error, tree) {
			if (error) {
				console.log("less compilation error");
				if (error.line) {
					console.log("error type: ", error.type);
					console.log(error.message);
					console.log("around...");
					console.log(extract_src_errors(src, error.line, 10));
				} else {
					console.log(error);
				}
			} else {
				try {
					grunt.file.write(self.data.dest, tree.toCSS(self.data.options));
				} catch (e) {
					console.log("less compilation error");
					console.log(e);
				}
				callback();
			}
		});
	});
};
