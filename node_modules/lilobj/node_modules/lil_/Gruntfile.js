/*global module:false */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        strict: false,
        eqnull: true,
        browser: true,
        node: true,
        globals: {}
      },
      files: ['grunt.js', 'lib/**/*.js', 'test/*.js']
    },
    mdlldr: {
      lil_: {
        root: './lib',
        src: ['lil_.js'],
        dest: './dist/lil_.js'
      }
    },
    buster: {
      test: {
        config: 'test/buster.js'
      },
      server: {
        port: 1111
      }
    },
    concat: {
      dist: {
        src: [
          'node_modules/lilprovider/lib/lilprovider.js',
          'dist/<%= pkg.name %>.js'
          ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<%= jshint.files %>',
      tasks: 'jshint buster'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mdlldr');
  grunt.loadNpmTasks('grunt-buster');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mdlldr', 'concat', 'uglify', 'buster']);

};
