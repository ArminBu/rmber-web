var Error = require('../models/error');

function IndexController() {
	this.docs = function (req, res) {
		res.render('docs', {
			title: 'Docs',
			docsNav: true
		});
	};
	this.home = function (req, res) {
		res.render('home', {
			title: '',
			homeNav: true
		});
	};
	this.report = function (req, res) {
		console.log(req.body);
		var error = new Error(req.body);
		error.save(function (err) {
			if (err) {
				res.status(500).end();
			} else {
				res.status(200).end();
			}
		});
	};
	this.bugs = function (req, res) {
		Error.find(function (err, bugs) {
			if (err) {
				res.render('error', {
					title: err.status,
					message: err.message,
					error: err
				});
			} else {
				console.log(bugs);
				res.render('bugs', {
					title: 'Bug Reports',
					bugsNav: true,
					bugs: bugs
				});
			}
		})
	}
}

module.exports = new IndexController;
