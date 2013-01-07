require.config({
	deps: [
		"application"
	],
	baseUrl: "/javascripts",
	paths: {
		jquery: "vendor/jquery",
		underscore: "vendor/underscore",
		handlebarsExtensions: "lib/handlebars_extensions",
		handlebars: "vendor/handlebars",
		hbs: "lib/hbs"
	},
	shim: {
		underscore: {
			deps: [],
			exports: "_"
		},
		handlebars: {
			deps: [],
			exports: "Handlebars"
		}
	}
});
