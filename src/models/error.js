var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var errorSchema = new Schema({
	api: {
		type: String,
		default: null
	},
	manufacturer: {
		type: String,
		default: null
	},
	model: {
		type: String,
		default: null
	},
	msg: {
		type: String,
		default: null
	},
	stacktrace: {
		type: String,
		default: null
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Error = mongoose.model('Error', errorSchema);
module.exports = Error;
