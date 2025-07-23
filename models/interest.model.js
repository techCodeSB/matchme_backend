const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
	user_id: {
		type: String, required: true
	},
	to_user_id: {
		type: String, required: true
	},
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'], default: "pending"
	},
}, { timestamps: true });


module.exports = mongoose.model("interest", interestSchema);
