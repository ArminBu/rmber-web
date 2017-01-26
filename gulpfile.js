var gulp = require('gulp'),
	notifier = require('node-notifier'),
	config = require('./config');
/*//
// 	Development
*/ //
var dev = require('./gulp/dev');
dev.tasks();
gulp.task('dev', dev.exec(), function () {
	notifier.notify({
		title: 'Development Build',
		message: 'Done.'
	});
});

/*//
// 	Production
*/ //
var prod = require('./gulp/prod');
prod.tasks();
gulp.task('prod', prod.install(), function (done) {
	notifier.notify({
		title: 'Production',
		message: 'Build done. Dependencies installed.'
	});
	console.log('Build done. Dependencies installed. Press Ctrl+C');
});

gulp.task('serve', prod.serve(), function () {
	notifier.notify({
		title: 'Production',
		message: 'Listening on port ' + config.app_port + '.'
	});
});
