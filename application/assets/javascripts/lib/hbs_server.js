define([], function() {
	var plugin = {};
	var precompileMap = {};

	function get(url, callback) {
		var fs = require.nodeRequire("fs");
		var content = fs.readFileSync(url, "utf8");
		callback(null, content);
	}

	plugin.load = function(name, parentRequire, load) {
		var fullName = "./build/" + name + ".js";
		get(fullName, function(error, content) {
			precompileMap[name] = content;
			load(content);
		});
	};

	plugin.write = function(pluginName, moduleName, write) {
		write.asModule(moduleName, precompileMap[moduleName]);
	};

	return plugin;
});
