define(function(require) {
	var Handlebars = require("handlebars");
	Handlebars.registerHelper("keyValue", function(obj, options) {
		var str = "";
		for(var key in obj) {
			if (obj.hasOwnProperty(key)) {
				str += (options.fn({ key: key, value: obj[key] }));
			}
		}
		return str;
	});

	return {};
});
