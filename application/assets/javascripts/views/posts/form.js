define(function(require) {
	var _ = require("underscore");

	var View = function(options) {
		this.$el = options.el;
		this.delegateEvents();
		this.callbacks = {
			change: [],
			submit: []
		};
	};

	View.prototype.delegateEvents = function() {
		this.$el.on("submit", this.submitAction.bind(this));
		this.$el.find("input,select").on("change", this.changeAction.bind(this));
	};

	View.prototype.changeAction = function(event) {
		if (!this.$el.find("input[type='submit']").hasClass("disabled")) {
			if (event.target.value) {
				var data = this.toJSON();
				_.each(this.callbacks.change, function(callback) {
					callback(data);
				});
			}
		}
	};

	View.prototype.submitAction = function(event) {
		event.preventDefault();
		if (!this.$el.find("input[type='submit']").hasClass("disabled")) {
			var data = this.toJSON();
			_.each(this.callbacks.submit, function(callback) {
				callback(data);
			});
		}
	};

	View.prototype.enable = function() {
		this.$el.find("input[type='submit']").removeClass("disabled");
	};

	View.prototype.disable = function() {
		this.$el.find("input[type='submit']").addClass("disabled");
	};

	View.prototype.toJSON = function() {
		return {
			title: this.$el.find("[name='title']").val(),
			body: this.$el.find("[name='body']").val()
		};
	};

	View.prototype.on = function(key, callback) {
		this.callbacks[key].push(callback);
	};

	return View;
});
