const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
	email: {
		type: String, trim: true
	},
	otp: {
		type: String, trim: true
	},
	expireIn: Number
}, { timestamps: true });


module.exports = mongoose.model("otp", otpSchema);