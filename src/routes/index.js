var express 	= require('express'),
	indexRouter = express.Router(),
	index 		= require('../controllers/indexCtrl');

// URI /
indexRouter
	.get('/', function (req, res) {
		index.home(req, res);
	})
	.get('/docs', function (req, res) {
		index.docs(req, res);
	})
	.get('/download', function (req, res) {
		index.download(req, res);
	})
	.get('/bugs', function (req, res) {
		index.bugs(req, res);
	})
	.post('/report', function (req, res) {
		index.report(req, res);
	});

module.exports = indexRouter;
