(function() {
  'use strict';
  var gulp = require('gulp');
  var order = require('gulp-order');
  var concat = require('gulp-concat');
  var plumber = require('gulp-plumber');
  var sourcemaps = require('gulp-sourcemaps');
  var babel = require('gulp-babel');
  var connect = require('gulp-connect');
  var uglify = require('gulp-uglify');
  var cleanCSS = require('gulp-clean-css');

  gulp.task('bundle', bundle);
  gulp.task('vendor', vendor);
  gulp.task('css', css);
  gulp.task('start-web-server', startWebServer);
  gulp.task('watch', watch);
  gulp.task('default', ['bundle', 'vendor', 'css', 'start-web-server', 'watch']);

  ///////////////

  var jsFiles = [
    'app/**/*.js',
    '!app/bower_components/**/*',
    '!app/content/bundle.js',
    '!app/content/vendor.js'
  ];

  var vendorFiles = [
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
    'app/bower_components/angular-loader/angular-loader.min.js',
    'app/bower_components/angular/angular.min.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'app/bower_components/angular-flash-alert/dist/angular-flash.js',
    'app/bower_components/textAngular/dist/textAngular-rangy.min.js',
    'app/bower_components/textAngular/dist/textAngular-sanitize.min.js',
    'app/bower_components/textAngular/dist/textAngular.min.js',
    'app/bower_components/spin.js/spin.js',
    'app/bower_components/angular-spinner/angular-spinner.js',
  ];

  var cssFiles = [
    'app/bower_components/font-awesome/css/font-awesome.min.css',
    'app/bower_components/bootstrap/dist/css/bootstrap.css',
    'app/bower_components/textAngular/dist/textAngular.css',
    'app/content/app.css'
  ];

  function bundle() {
    return gulp.src(jsFiles)
      .pipe(order([
        'app/app.module.js',
        'app/**/*.module.js',
        'app/**/*.js'
      ], { base: './' }))
      .pipe(plumber())                // restart gulp on error
      .pipe(sourcemaps.init())        // let sourcempas watch this pipeline
      .pipe(babel({
        presets: ['es2015']
      }))                  // transpile into ES5 for browsers
      .pipe(concat('bundle.js'))      // concatenate all JS files
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))    // emit the .map file for debugging
      .pipe(gulp.dest('app/content'));
  }

  function vendor() {
    return gulp.src(vendorFiles)
      .pipe(order(vendorFiles, { base: './' }))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/content'));
  }

  function css() {
    return gulp.src(cssFiles)
      .pipe(order(cssFiles, {base: './' }))
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(concat('bundle.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/content'));
  }

  function startWebServer() {
    connect.server({
      root: 'app',
      port: 8000
    });
  }

  function watch() {
    gulp.watch([
      'app/**/*',
      'gulpfile.js',
      '!app/content/bundle.*',
      '!app/content/vendor.*',
    ], ['bundle']);
  }
})();
