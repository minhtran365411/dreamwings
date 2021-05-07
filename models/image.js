//Blog schema

var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	
	album: mongoose.Schema.Types.Mixed,
	imageURL: String,
	text: String
});



module.exports = mongoose.model("Image", ImageSchema);