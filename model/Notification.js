const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user_matches: [
    {
      user_id: String,
      notification: Boolean,
      timestamp: String,
    },
  ],
  email: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "NotificationSchema",
  NotificationSchema,
  "users"
);
