//Blog schema

var mongoose = require("mongoose");

var albumSchema = new mongoose.Schema({
	title: String,
	createAt: {
			type: Date,
			default: Date.now
		},
	imageURL: String
	
});

module.exports = mongoose.model("Album", albumSchema);