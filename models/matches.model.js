const mongoose = require("mongoose");

const matchArray = new mongoose.Schema({
    match_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    match_date: Date,
    interest_send: Boolean,
    interest_send_date: Date,
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "removed"],
    },
    status_change_date: Date
}, { _id: false });


const userMatchesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    matches: [matchArray]

}, { timestamps: true });

module.exports = new mongoose.model("usermatches", userMatchesSchema);
