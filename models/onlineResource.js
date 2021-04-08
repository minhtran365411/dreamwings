//inlineResource schema

var mongoose = require("mongoose");

var onlineResourceSchema = new mongoose.Schema({
	typeMedia: String,
	pageName: String,
	link: String,
    imageSrc: {type:String, default: 'https://media.istockphoto.com/vectors/learn-english-icon-set-vector-id646908600?b=1&k=6&m=646908600&s=612x612&w=0&h=hT6vZ1M9G9RTozU8jjxkBre6jw9HBrxrysLVajeWbB0='},
    levelCambridge: String,
    difficultyRating: Number,
	text: String,
	
});

module.exports = mongoose.model("OnlineResource", onlineResourceSchema);