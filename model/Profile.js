const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lookingFor = mongoose.Schema({
  mate: Boolean,
  friend: Boolean,
  adopt: Boolean,
  give_for_adoption: Boolean,
});

const Profile = new Schema({
  email: {
    type: String,
  },
  hashed_password: {
    type: String,
  },
  user_id: {
    type: String,
  },
  about: {
    type: String,
  },
  dob_year: {
    type: Number,
    min: 1900,
    max: 2022,
  },
  pet_name: {
    type: String,
  },
  gender_identity: {
    type: String,
  },
  type_of_pet: {
    type: String,
  },
  gender_interest: {
    type: String,
  },
  looking_for: {
    type: lookingFor,
  },
  user_matches: {
    type: Array,
  },
  pedigree: {
    type: Boolean,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", Profile, "users");
