'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');
var shell = require('gulp-shell');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/bootstrap\.js/]
  }
};

// Loading gulp task files through require js
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.js$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});


gulp.task('docs', shell.task([
  'node_modules/jsdoc/jsdoc.js '+
  '-c node_modules/angular-jsdoc/conf.json '+   // config file
  '-t node_modules/angular-jsdoc/template '+    // template file
  '-d build/docs '+                             // output directory
  '-r src/app/*.js'                              // source code directory
]));
