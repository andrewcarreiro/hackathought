module.exports = function(grunt) { 
	grunt.initConfig({
		express : {
			server : {
				options : {
					script : 'server.js'
				}
			}
		},
		copy : {
			bower : {
				files : [
					{ expand : true, src : ['fonts/*'], cwd :'bower_components/bootstrap/', dest: '.public/'},
					{ expand : true, flatten : true, dest: '.public/csstemp/', 
						src : [
							'bower_components/bootstrap/dist/css/bootstrap.css'
						]
					},
					{ expand : true, flatten : true, dest: '.public/jstemp/', 
						src : [
							'bower_components/jquery/dist/jquery.min.js',
							'bower_components/bootstrap/dist/js/bootstrap.min.js',
							'clientassets/scripts/*'
						]
					}
				]
			}
		},
		concat : {
			css : {
				src : ['.public/csstemp/*', '.public/csstemp/main.css'],
				dest : '.public/style.css'
			},
			js : {
				src : [
					'.public/jstemp/jquery.min.js',
					'.public/jstemp/*', 
					'.public/jstemp/main.js'
				],
				dest : '.public/head.js'
			}
		},
		clean : {
			publicdir : {
				src : ['.public']
			}
		},
		watch : {
			express: {
				files : [ 'scripts/**', 'views/**', 'server.js', 'clientassets/**' ],
				tasks : ['clean:publicdir','copy:bower','less:styles','concat:js','concat:css','express:server'],
				options : {
					spawn 		: false,
					livereload 	: true
				}
			}
		},
		open : {
			dev : {
				path : 'http://localhost:3000'
			}
		},
		less : {
			styles : {
				files : {
					'.public/csstemp/main.css' : 'clientassets/main.less'
				}
			}
		}

	});


	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('default', ['clean:publicdir','copy:bower','less:styles','concat:js','concat:css','express:server','open']);
	grunt.registerTask('server',  ['clean:publicdir','copy:bower','less:styles','concat:js','concat:css','express:server','open','watch']);
	//grunt.registerTask('deploy'); //todo
};