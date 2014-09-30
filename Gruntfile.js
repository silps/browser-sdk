module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    curl:{
      'vendor/pubnub.min.js': 'https://raw.githubusercontent.com/pubnub/javascript/master/web/pubnub.min.js',
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      build: {
        src: ["lib/relayr.js"],
        dest: 'build/relayr.min.js'
      }
    },
    concat:{
      dist:{
        src: ["build/relayr.min.js", "vendor/pubnub.min.js"],
        dest: "build/<%= pkg.name %>.min.js"
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/*.js']
    }

  });

  // Load the plugin that provides the "uglify" task. 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-curl');

  // Default task(s).
  grunt.registerTask('default', ['jshint','curl','uglify','concat']);

};