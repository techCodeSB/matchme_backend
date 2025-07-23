import mongoose from "mongoose";

const keySchema = new mongoose.Schema({
	key_name: {
		type: String, trim: true
	},
	text_to_show: {
		type: String, trim: true
	},
	default_text: {
		type: String, trim: true
	},
	placeholder_text: {
		type: String, trim: true
	},
	default_placeholder_text: {
		type: String, trim: true
	},
}, { timestamps: true });

module.exports = mongoose.model("keys", keySchema);