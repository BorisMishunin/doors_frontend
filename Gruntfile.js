'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    useminPrepare: {
      html: 'app/views/index.html',
      options: {
        dest: 'dist'
        }
    },

    concat: {
      '.tmp/concat/assets/js/optimized.js': [
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '<%= yeoman.app %>/components/owl-carousel/owl-carousel/owl.carousel.js',
        '<%= yeoman.app %>/components/ng-repeat-owl-carousel/dist/ngRepeatOwlCarousel.js'
      ],
      //'.tmp/concat/assets/css/optimized.css': [
      //  '<%= yeoman.app %>/styles/{,*/}*.css'
      //]
    },

    uglify: {
      'dist/scripts/main.min.js': ['.tmp/concat/assets/js/optimized.js']
    },


    cssmin: {
      dist: {
        files: {
          'dist/styles/main.min.css': [
            '<%= yeoman.app %>/styles/{,*/}*.css',
            //'<%= yeoman.app %>/components/owl-carousel/owl-carousel/owl.theme.css',
            '<%= yeoman.app %>/components/owl-carousel/owl-carousel/owl.carousel.css'
          ]
        //  'dist/styles/main.min.css': ['.tmp/concat/assets/css/optimized.css']
        }
      }
    },


    // Includes html
    includes: {
      build: {
        cwd: 'app/views',
        src: [ '*.html' ],
        dest: 'dist/html/',
        options: {
          flatten: true,
          includePath: 'app/includes'
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'components/**/*',
            'fonts/**/*',
            'images/{,*/}*.{gif,webp}'
          ]
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      target: {
        src: ['<%= yeoman.app %>/**/*.html']
      }
    }
  });

  grunt.loadNpmTasks('grunt-includes');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'coffee:dist',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'wiredep',
    'copy',
    'uglify',
    'includes'
  ]);

  grunt.registerTask('default', ['build']);
};
