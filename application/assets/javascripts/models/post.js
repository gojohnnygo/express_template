define(function(require) {
	var _ = require("underscore");

	var Model = function(options) {
		_.extend(this, options);
	};

	Model.prototype.save = function(callback) {
		var self = this;
		window.setTimeout(function() { callback(self); }, 100);
	};

	return Model;
});
