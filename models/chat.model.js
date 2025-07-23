import mongoose from "mongoose";

const chatQuestionsSchema = new mongoose.Schema({
	type: String,
	title: String,
	options: [String],
	key: String,
	order: Number,
}, { timestamps: true });

module.exports = mongoose.model("Chatquestions", chatQuestionsSchema);
