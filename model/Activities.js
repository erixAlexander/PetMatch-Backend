const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Activities = new Schema({
  activity: {
    type: String,
  },
});

module.exports = mongoose.model("activities", Activities, "users");
