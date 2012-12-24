require.config({
	deps: [ "application" ],
	baseUrl: "/javascripts",
	paths: {
		jquery: "vendor/jquery",
		underscore: "vendor/underscore"
	},
	shim: {
		underscore: {
			deps: [],
			exports: "_"
		}
	}
});
