const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: [
      "NEW_CONNECTION_REQUEST",
      "CONNECTION_REQUEST_ACCEPTED",
      "NEW_MATCH",
    ],
  },
}, { timestamps: true, });

module.exports = mongoose.model("notification", notificationSchema);

