const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
	cron_name: {
		type: String,
		required: true,
		enum: ["MATCH", "MANAGE_MATCHES"],
	},
	cron_time: {
		type: String,
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model("config", configSchema);
