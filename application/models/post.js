var Post = function() { };

Post.all = function(callback) {
	callback(null, [
		{ id: 1, title: "foo", body: "body 1" },
		{ id: 2, title: "bar", body: "body 2" },
		{ id: 3, title: "baz", body: "body 3" }
	]);
};

Post.find = function(id, callback) {
	callback(null, {id: id, title: "foo", body: "body"});
};

module.exports = Post;
