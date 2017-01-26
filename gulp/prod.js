var gulp = require('gulp'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	nodemon = require('gulp-nodemon'),
	paths = require('./paths'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	notify = require('gulp-notify'),
	merge = require('merge-stream'),
	install = require('gulp-install'),
	minifyCSS = require('gulp-clean-css');

function prodGulp() {
	this.tasks = function () {
		gulp.task('prod_build', function (done) {
			var prod_css = function () {
					return gulp.src(paths.styles)
						.pipe(less())
						.pipe(minifyCSS())
						.pipe(concat('styles.min.css'))
						.pipe(gulp.dest('./dist/src/public/minified/'));
					// less converted, minified and concated.
				},
				prod_js = function () {
					return gulp.src(paths.scripts)
						.pipe(plumber())
						.pipe(uglify())
						.pipe(concat('scripts.min.js'))
						.pipe(gulp.dest('./dist/src/public/minified/'));
					// js uglified and concated.
				},
				prod_controllers = function () {
					return gulp.src(paths.controllers)
						.pipe(plumber())
						.pipe(uglify())
						.pipe(gulp.dest('./dist/src/controllers/'));
					// controllers uglified.
				},
				prod_models = function () {
					return gulp.src(paths.models)
						.pipe(plumber())
						.pipe(uglify())
						.pipe(gulp.dest('./dist/src/models/'));
					// models uglified.
				},
				prod_routes = function () {
					return gulp.src(paths.routes)
						.pipe(plumber())
						.pipe(uglify())
						.pipe(gulp.dest('./dist/src/routes/'));
					// routes uglified.
				},
				prod_src = function () {
					return gulp.src(paths.src)
						.pipe(plumber())
						.pipe(uglify())
						.pipe(gulp.dest('./dist/'));
					// routes uglified.
				},
				prod_views = function () {
					return gulp.src(paths.views)
						.pipe(gulp.dest('./dist/src/views/'));
				},
				prod_json = function () {
					return gulp.src(paths.json)
						.pipe(gulp.dest('./dist/'));
				},
				prod_www = function () {
					return gulp.src(paths.server)
						.pipe(gulp.dest('./dist/src/bin/'))
				};
			return merge(
				prod_css(),
				prod_js(),
				prod_controllers(),
				prod_models(),
				prod_routes(),
				prod_src(),
				prod_views(),
				prod_json(),
				prod_www()
			);
		});
		gulp.task('prod_install', ['prod_build'], function(done) {
			return gulp.src(paths.json)
				.pipe(gulp.dest('./dist/'))
				.pipe(install({
					production: true
				}));
			done();
		});
		gulp.task('prod_server', function () {
			nodemon({
				'script': './dist/src/bin/www'
			});
		});
	};
	this.install = function () {
		return ['prod_install'];
	};
	this.serve = function () {
		return ['prod_server'];
	};
}
module.exports = new prodGulp;
