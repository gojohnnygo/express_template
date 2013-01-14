define(function(require) {
	var $        = require("jquery");
	var template = require("hbs!templates/post");

	var View = function(options) {
		this.template = template;
		this.$el      = $("<div>");
		this.delegateEvents();
	};

	View.prototype.delegateEvents = function() {
	};

	View.prototype.render = function(options) {
		this.$el.html(this.template(options));
		return this;
	};

	return View;
});
