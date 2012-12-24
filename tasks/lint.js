/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

var jshint = require('jshint').JSHINT;

module.exports = function(grunt) {
	// External libs.

	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask('lint', 'Validate files with JSHint.', function() {
		// Get flags and globals, allowing target-specific options and globals to
		// override the default options and globals.
		var options, globals, tmp;

		tmp = grunt.config(['jshint', this.target, 'options']);
		if (typeof tmp === 'object') {
			grunt.verbose.writeln('Using "' + this.target + '" JSHint options.');
			options = tmp;
		} else {
			grunt.verbose.writeln('Using master JSHint options.');
			options = grunt.config('jshint.options');
		}
		grunt.verbose.writeflags(options, 'Options');

		tmp = grunt.config(['jshint', this.target, 'globals']);
		if (typeof tmp === 'object') {
			grunt.verbose.writeln('Using "' + this.target + '" JSHint globals.');
			globals = tmp;
		} else {
			grunt.verbose.writeln('Using master JSHint globals.');
			globals = grunt.config('jshint.globals');
		}
		grunt.verbose.writeflags(globals, 'Globals');

		// Lint specified files.
		var lintFiles =  grunt.file.expandFiles(this.data.files);
		var ignoreFiles = grunt.file.expandFiles(this.data.ignoreFiles);

		grunt.file.expandFiles(grunt.utils._.difference(lintFiles, ignoreFiles)).forEach(function(filepath) {
			grunt.helper('lint', grunt.file.read(filepath), options, globals, filepath);
		});

		// Fail task if errors were logged.
		if (this.errorCount) { return false; }

		// Otherwise, print a success message.
		grunt.log.writeln('Lint free.');
	});

	// Lint source code with JSHint.
	grunt.registerHelper('lint', function(src, options, globals, extraMsg) {
		// JSHint sometimes modifies objects you pass in, so clone them.
		options = grunt.utils._.clone(options);
		globals = grunt.utils._.clone(globals);
		// Enable/disable debugging if option explicitly set.
		if (grunt.option('debug') !== undefined) {
			options.devel = options.debug = grunt.option('debug');
			// Tweak a few things.
			if (grunt.option('debug')) {
				options.maxerr = Infinity;
			}
		}
		var msg = 'Linting' + (extraMsg ? ' ' + extraMsg : '') + '...';
		grunt.verbose.write(msg);
		// Tab size as reported by JSHint.
		// Lint.
		var result = jshint(src, options || {}, globals || {});
		if (result) {
			// Success!
			grunt.verbose.ok();
		} else {
			// Something went wrong.
			grunt.verbose.or.write(msg);
			grunt.log.error();
			// Iterate over all errors.
			jshint.errors.forEach(function(e) {
				// Sometimes there's no error object.
				if (!e) { return; }
				var pos;
				var evidence = e.evidence;
				var character = e.character;
				if (evidence) {
					// Manually increment errorcount since we're not using grunt.log.error().
					grunt.fail.errorcount++;
					// Descriptive code error.
					pos = '['.red + ('L' + e.line).yellow + ':'.red + ('C' + character).yellow + ']'.red;
					grunt.log.writeln(pos + ' ' + e.reason.yellow);
					// If necessary, eplace each tab char with something that can be
					// swapped out later.
					if (character > evidence.length) {
						// End of line.
						evidence = evidence + ' '.inverse.red;
					} else {
						// Middle of line.
						evidence = evidence.slice(0, character - 1) + evidence[character - 1].inverse.red +
							evidence.slice(character);
					}
					grunt.log.writeln(evidence);
				} else {
					// Generic "Whoops, too many errors" error.
					grunt.log.error(e.reason);
				}
			});
			grunt.log.writeln();
		}
	});
};
