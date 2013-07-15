module.exports = function(grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		watch: {

			styles: {
				files: ['assets/scss/**/*.{scss,sass}'],
				tasks: ['compass'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['assets/js/**/*.js'],
				tasks: ['jshint'],
				options: {
					debounceDelay: 500
				}
			}

		},

		jshint: {
			gruntfile: ['Gruntfile.js'],
			assets: ['assets/js/**/*.js']
		},

		uglify: {

			/* Compress the CodeMirror scripts into a single file */
			codemirror: {
				files: {
					'vendor/codemirror.min.js': [
						'vendor/codemirror/lib/codemirror.js',
						'vendor/codemirror/mode/clike.js',
						'vendor/codemirror/mode/php.js',
						'vendor/codemirror/addon/dialog.js',
						'vendor/codemirror/addon/searchcursor.js',
						'vendor/codemirror/addon/search.js',
						'vendor/codemirror/addon/matchbrackets.js'
					]
				}
			}
		},

		compass: {
			dist: {
				options: {
					config: 'assets/config.rb'
				}
			}
		},

		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: '**/*',
					dest: 'assets/images/'
				}]
			}
		},

		clean: {
			deploy: ['deploy']
		},

		copy: {
			deploy: {
				files: [{
					expand: true,
					cwd: './',
					src: [
						'*',
						'includes/**/*',
						'admin/**/*',
						'assets/**/*',
						'vendor/**/*',
						'languages/**/*',

						'!.travis.yml',
						'!.gitignore',
						'!build-*.sh',
						'!README.md',
						'!CHANGELOG.md',
						'!Gruntfile.js',
						'!package.json',
						'!phpunit.xml',
						'!**/Thumbs.db'
					],
					dest: 'deploy/',
					filter: 'isFile'
				}]
			}
		}

	});

	grunt.registerTask( 'default', ['jshint', 'uglify', 'compass'] );
	grunt.registerTask( 'deploy', ['clean:deploy', 'copy:deploy'] );
};