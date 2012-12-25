define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	window.alert("boot");
	$("div");
	_.each([1,2,3], function(val) {
		val++;
	});
});
