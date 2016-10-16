'use strict';

var gulp = require('gulp');
var os = require('os');
var rimraf = require('gulp-rimraf');
var path = require('path');
var $ = require('gulp-load-plugins')();
var notify = require('gulp-notify');

// var app = 'src/';
var dist = 'dist/';

var autoprefixerBrowsers = [
  'ie >= 11',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 6',
  'android >= 4.4',
  'bb >= 10'
];

// tasks definition

gulp.task('clean', function () {
  return gulp.src([
    __dirname + '/api/static/css/*',
    __dirname + '/api/static/images/*',
    __dirname + '/build/static/css/*',
    __dirname + '/build/api-php/*',
    __dirname + '/build/.htaccess',
  ]).pipe(rimraf());
});

gulp.task('styles', function () {
  return gulp.src(__dirname + '/src/components/SDK/**/*.scss')
             .pipe($.plumber())
             .pipe($.sass({errLogToConsole: true, compress: true, 'include css': true}))
             .pipe($.autoprefixer(autoprefixerBrowsers))
             .pipe($.flatten())
             .pipe($.csso())
             .pipe(gulp.dest(__dirname + '/build/static/css'))
             .pipe($.size({title: 'css'}))
             .pipe($.notify({
               message: 'SCSS compilation complete.',
               notifier: function () {
                 return false;
               }
             }));
});

gulp.task('images', function () {
  return gulp.src([
               __dirname + '/src/assets/images/**/*.{png,jpg,jpeg,gif,svg}',
               __dirname + '/src/assets/images/*.{png,jpg,jpeg,gif,svg}'
             ])
             .pipe($.plumber())
             .pipe($.rename(function (path) {
               var temp = path.dirname.split("/");
               temp.splice(0, 4);
               path.dirname = temp.toString().replace(/,/g, "/");
             }))
             .pipe(gulp.dest(__dirname + '/build/static/images'))
             .pipe($.size());
});

gulp.task('php-handling', function () {
  return gulp.src([
    __dirname + '/api-php/.htaccess'
  ]).pipe(gulp.dest(__dirname + '/build'))
});

gulp.task('php-api', function () {
  return gulp.src([
    __dirname + '/api-php/api.php',
  ]).pipe(gulp.dest(__dirname + '/build/api-php'))
});

// watch styl, html and js file changes
/*gulp.task('watch', function () {
  gulp.watch(app + 'assets/scss/!*.scss', ['styles']);
  gulp.watch(app + 'assets/scss/!**!/!*.scss', ['styles']);
});*/

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
  return gulp.start(['images', 'styles', 'php-api', 'php-handling']);
});

gulp.task('default', ['build'], function () {

});