var jshintOptions = require("./config/jshint.js");

module.exports = function(grunt) {
	grunt.initConfig({
		jshint: jshintOptions,
		lint: {
			server: {
				ignoreFiles: [
					"application/assets/**/*",
					"application/views/**/*"
				],
				files: [
					"application/**/*.js"
				]
			},
			browser: {
				ignoreFiles: [
					"application/assets/javascripts/vendor/**/*",
					"application/assets/javascripts/spec/**/*"
				],
				files: [
					"application/assets/javascripts/**/*.js"
				]
			}
		},

		less: {
			dev: {
				src: "application/assets/stylesheets/application.less",
				dest: "public/stylesheets/application.css",
				paths: ["application/assets/stylesheets"],
				options: {}
			},
			release: {
				src: "application/assets/stylesheets/application.less",
				dest: "public/stylesheets/application.css",
				paths: ["application/assets/stylesheets"],
				options: { compress: true }
			}
		},

		watch: {
			less: {
				files: "application/assets/stylesheets/**/*.less",
				tasks: "less:dev"
			}
		},

		requirejs: {
			release: {
				baseUrl: "application/assets/javascripts",
				mainConfigFile: "application/assets/javascripts/config.js",
				optimize: "none",
				name: "application",
				insertRequire: ["application"],
				preserveLicenseComments: false,
				stubModules: ["hbs"],
				out: "public/javascripts/application.js",
				paths: {
					hbs: "lib/hbs_server"
				}
			}
		},

		min: {
			release: {
				src: ["application/assets/javascripts/vendor/almond.js", "public/javascripts/application.js"],
				dest: "public/javascripts/application.js"
			}
		}
	});

	grunt.loadTasks("tasks");
	grunt.registerTask("build", "lint:server lint:browser less:release compileTemplates requirejs:release");
	grunt.registerTask("release", "build min:release");
};
