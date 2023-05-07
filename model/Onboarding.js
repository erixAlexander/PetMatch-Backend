const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lookingFor = mongoose.Schema({
  mate: Boolean,
  friend: Boolean,
  adopt: Boolean,
  give_for_adoption: Boolean,
});

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

const onboarding = new Schema({
  email: {
    type: String,
  },
  hashed_password: {
    type: String,
  },
  user_id: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  dob_year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2022,
  },
  pet_name: {
    type: String,
    required: true,
  },
  gender_identity: {
    type: String,
    required: true,
  },
  type_of_pet: {
    type: String,
    required: true,
  },
  gender_interest: {
    type: String,
    required: true,
  },
  looking_for: {
    type: lookingFor,
    required: true,
  },
  user_matches: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  pedigree: {
    type: Boolean,
  },
  distance: {
    type: Number,
    required: true,
  },
  address_info: {
    type: addressInfo,
    required: true,
  },
  activity: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("onboarding", onboarding, "users");
