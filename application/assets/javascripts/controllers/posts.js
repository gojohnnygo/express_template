define(function(require) {
	var $            = require("jquery");
	var NewPostView  = require("views/posts/form");
	var ShowPostView = require("views/posts/show");
	var PostModel    = require("models/post");

	var Controller = function() {
		this.models = [];
		this.formView = new NewPostView({ el: $("form") });
	};

	Controller.prototype.setupBindings = function() {
		this.formView.on("submit", this.createPostAction.bind(this));
	};

	Controller.prototype.createPostAction = function(data) {
		var post = new PostModel(data);
		this.models.push(post);
		post.save(this.renderPost.bind(this));
	};

	Controller.prototype.renderPost = function(model) {
		var el = $(".posts");
		var view = new ShowPostView({}).render(model);
		el.append(view.$el);
	};

	return Controller;
});
