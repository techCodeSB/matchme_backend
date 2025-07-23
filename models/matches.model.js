const mongoose = require("mongoose");

const userMatchesSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    match_id: String, // sorted combination of user1 and user2
    user1_match_number: Number,
    user2_match_number: Number,
    user1_shown: {
        type: Boolean,
        default: false,
    },
    user2_shown: {
        type: Boolean,
        default: false,
    },
    acted_by_user1: {
        type: Boolean,
        default: false,
    },
    acted_by_user2: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = new mongoose.model("usermatches", userMatchesSchema);
