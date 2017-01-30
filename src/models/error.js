var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var errorSchema = new Schema({
	api: {
		type: String,
		default: "No further details."
	},
	manufacturer: {
		type: String,
		default: "No further details."
	},
	model: {
		type: String,
		default: "No further details."
	},
	msg: {
		type: String,
		default: "No further details."
	},
	stacktrace: {
		type: String,
		default: "No further details."
	},
	cause: {
		type: String,
		default: "No further details."
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Error = mongoose.model('Error', errorSchema);
module.exports = Error;
