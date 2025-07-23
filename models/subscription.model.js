const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	},
	start_date: Date,
	end_date: Date
}, { timestamps: true });

module.exports = new mongoose.model("subscription", subscriptionSchema);