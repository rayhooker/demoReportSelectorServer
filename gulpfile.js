"use strict";

var gulp = require('gulp');
// var uglify = require('gulp-uglify');
// var streamify = require('gulp-streamify');
// var minify = require('gulp-minify');
// var sourcemaps = require('gulp-sourcemaps');
// var babel = require('gulp-babel');
// var babelify = require('babelify');
var concat = require('gulp-concat');
var connect = require('gulp-connect'); //Runs a local dev server
var customizeBootstrap = require('gulp-customize-bootstrap');
var less = require('gulp-less');
// var open = require('gulp-open'); //Open a URL in a web browser 
// var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
// var concat = require('gulp-concat'); //Concatenates files 
// In order to compile for production, run export NODE_ENV=production before gulp
var config = { 
	paths: { 
		css: [
			// 'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'src/styles/bootstrap.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.scss',
			'node_modules/c3/c3.css',
			'node_modules/react-select/dist/react-select.css',
			'static/styles/reportselector.css'
		] 
	}
};
gulp.task('compileBootstrap', function() {
    return gulp.src('node_modules/bootstrap/less/bootstrap.less')
      .pipe(customizeBootstrap('static/styles/less/*.less'))
      .pipe(less())
      .pipe(gulp.dest('src/styles/'));
  });

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('reportselector.css'))
		.pipe(gulp.dest('static/css'));
});


gulp.task('default', [ 'css']);
//gulp.task('default', ['compileBootstrap', 'css']);
