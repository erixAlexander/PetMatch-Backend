const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressInfo = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

const changeAddress = new Schema({
  user_id: {
    type: String,
  },
  address_info: {
    type: addressInfo,
  },
  email: {
    type: String,
  },
  distance:{
    type: Number
  }
});

module.exports = mongoose.model("changeAddress", changeAddress, "users");
