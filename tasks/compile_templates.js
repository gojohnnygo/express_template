var path               = require("path");
var fs                 = require("fs");
var vm                 = require("vm");
var config             = require(path.join(__dirname, "..", "config", "application"));
var basePath           = path.join(config.root, "application", "assets", "javascripts");

function create_context() {
	var context = vm.createContext({});
	vm.runInContext(fs.readFileSync(path.join(basePath, "vendor", "handlebars.js"), "utf8"), context);
	return context;
};


module.exports = function(grunt) {
	grunt.registerTask("compileTemplates", "", function() {
		var outputPath   = path.join(config.root, "build");
		var basePath     = path.join(config.root, "application", "assets", "javascripts");
		var templatePath = path.join(basePath, "templates");
		var files        = grunt.file.expand(templatePath + "/**/*.hbs");
		var context = create_context();
		files.forEach(function(filePath) {
			var moduleName = path.relative(basePath, filePath).replace(".hbs", "");
			var content    = grunt.file.read(filePath);
			var template   = context.Handlebars.precompile(content);
			var result     = "define(";
			result += "'" + "hbs!" + moduleName + "',";
			result += "function() { return Handlebars.template(" + template + ")});\n";
			grunt.file.write(path.join(outputPath, moduleName + ".js"), result);
		});
	});
};
