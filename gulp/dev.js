var gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	nodemon = require('gulp-nodemon'),
	paths = require('./paths'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	minifyCSS = require('gulp-clean-css'),
	lrPort = 3002;

function devGulp() {
	this.tasks = function () {
		livereload({
			start: true
		});
		gulp.task('dev_css', function () {
			return gulp.src(paths.styles)
				.pipe(less())
				.pipe(minifyCSS())
				.pipe(concat('styles.min.css'))
				.pipe(gulp.dest('./src/public/minified/'))
				.pipe(livereload());
				// less converted, minified and concated.
		});
		gulp.task('dev_js', function () {
			return gulp.src(paths.scripts)
				.pipe(plumber())
				.pipe(uglify())
				.pipe(concat('scripts.min.js'))
				.pipe(gulp.dest('./src/public/minified/'))
				.pipe(livereload());
				// js uglified and concated.
		});
		gulp.task('dev_serve', function () {
			var stream = nodemon({
				nodemon: require('nodemon'),
				script: paths.server
			})
			stream.on('restart', function () {
        console.log('restarted!')
      }).on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      });
		});
		gulp.task('dev_lr', function () {
			return gulp.src(paths.src)
				.pipe(livereload());
				// livereload running.
		});
		gulp.task('dev_watch', function () {
			livereload.listen();
			gulp.watch(paths.views, ['dev_lr']);
			gulp.watch(paths.scripts, ['dev_js']);
			gulp.watch(paths.styles, ['dev_css']);
		});
	};
	this.exec = function () {
		return ['dev_css', 'dev_js', 'dev_lr', 'dev_serve', 'dev_watch']
	};
}
module.exports = new devGulp;
