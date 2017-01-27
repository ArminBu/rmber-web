var paths = {
	styles: [
		'./bower_components/bootstrap/dist/css/bootstrap.css',
		'./src/public/styles/*.less'
	],
	views: [
		'./src/views/*.pug'
	],
	scripts: [
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap/dist/js/bootstrap.js',
		'./src/public/js/*.js'
	],
	server: './src/bin/www',
	src: [
		'./app.js',
		'./config.js',
		'./seed.js'
	],
	json: [
		'./package.json',
		'./bower.json'
	],
	controllers: [
		'./src/controllers/*.js'
	],
	models: [
		'./src/models/*.js'
	],
	routes: [
		'./src/routes/*.js'
	],
}
module.exports = paths;
