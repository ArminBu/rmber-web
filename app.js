var express 		= require('express'),
	path 			= require('path'),
	bodyParser 		= require('body-parser'),
	config 			= require('./config'),
	// helper
	favicon 		= require('serve-favicon'),
	logger 			= require('morgan'),
	// database
	mongoose 		= require('mongoose'),
	// database models
	fs 				= require('fs').
		readdirSync(__dirname + '/src/models')
		.forEach(function (filename) {
			if (~filename.indexOf('.js')) require(__dirname + '/src/models/' + filename);
		}),
	// routes
	index 			= require('./src/routes/index'),
	// init app
	app 			= express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

// uncomment after placing favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

// server root address
app.use(express.static(path.join(__dirname)));

// set response headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set routes
app.use('/', index);

// 404
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use('/', function (err, req, res, next) {
		err.status = err.status || 500;
		res.render('error', {
			title: err.status,
			message: err.message,
			error: err
		});
	});

	// API Key (Dev)
	app.set('secretToken', config.secretToken);

	// setup mongodb with mongoose
	mongoose.connect(
		'mongodb://' +
		config.db.location + ':' +
		config.db.port + '/' +
		config.db.name
	);
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		title: err.status,
		message: err.message,
		error: {}
	});
});

module.exports = app;
