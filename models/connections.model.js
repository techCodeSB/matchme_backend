const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	user_id: String,
	to_user_id: String,
	connection_status: {
		type: String,
		removed_by: { type: String },
		enum: ["pending", "accepted", "rejected", "removed"],
		default: "pending",
	},
}, { timestamps: true });

module.exports = mongoose.model("userconnections", usersSchema);
