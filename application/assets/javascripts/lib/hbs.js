define(function(require) {
	var plugin = {};
	var Handlebars = require("handlebars");

	function get(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onload = function() {
			callback(null, xhr.responseText);
		};
		xhr.send();
	}

	plugin.load = function(name, parentRequire, load) {
		var fullName = parentRequire.toUrl(name + ".hbs");
		get(fullName, function(error, content) {
			load(Handlebars.compile(content));
		});
	};

	return plugin;
});
