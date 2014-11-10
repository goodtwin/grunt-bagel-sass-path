/*
 * grunt-bagel-sass-path
 * https://github.com/goodtwin/grunt-bagel-sass-path
 *
 * Copyright (c) 2014 GoodTwin Design Inc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var _ = require('lodash');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('bagel_sass_path', 'Sets up sass paths dynamically based on installed bagel modules and themeing.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        chrome: ['./']
      }),
      // add bagel npm modules to the globbing pattern
      // expand into folders that exist for sass's loadpath.
      loadPaths = grunt.file.expand({},
        _.union(
          // grunt.config.get('sass.options.loadPath'),
          options.chrome,
          [
            'node_modules/',
            'node_modules/bagel-*/node_modules/',
            'node_modules/**/node_modules/bagel-*/node_modules/'
          ]));

    grunt.verbose.writeln("Chrome: ");
    grunt.verbose.writeln(grunt.log.wordlist(options.chrome));
    grunt.verbose.writeln("Load paths for bagel sass modules:");
    grunt.verbose.writeln(grunt.log.wordlist(loadPaths));

    // check for a sass module to be installed
    if(!grunt.config.get('sass.options')){
      grunt.verbose.error('No sass options are specified');
    } else {
      grunt.config.set('sass.options.loadPath', loadPaths);
    }
  });

};
