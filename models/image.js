//Blog schema

var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	
	album: mongoose.Schema.Types.Mixed,
	imageURL: String
});



module.exports = mongoose.model("Image", ImageSchema);