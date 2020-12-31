//Blog schema

var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: String,
	lead: String,
	createAt: {
			type: Date,
			default: Date.now
		},
	text: String,
	imageURL: String
	
});

module.exports = mongoose.model("Blog", blogSchema);