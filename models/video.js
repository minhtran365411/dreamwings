//Blog schema

var mongoose = require("mongoose");

var VideoSchema = new mongoose.Schema({
	videoURL: String
});



module.exports = mongoose.model("Video", VideoSchema);