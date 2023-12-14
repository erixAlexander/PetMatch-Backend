const Onboarding = require("../model/Onboarding");

const handleGenderedUsers = async (req, res) => {
  const { gender, type, userId, address } = req.query;

  if (!gender || !type || !userId || !address) {
    return res.status(400).json({
      message: "Missing a mandatory parameter: gender, type, address or id.",
    });
  }
  let query = { type_of_pet: type, user_id: { $ne: userId } };

  try {
    if (gender !== "any") {
      query.gender_identity = gender;
    }
    console.log(address);

    const returnedUsers = await Onboarding.find(query).select([
      "email",
      "images",
      "pet_name",
      "user_id",
      "about",
      "activity",
      "address_info",
      "dob_year",
      "distance",
      "gender_identity",
      "looking_for",
      "pedigree",
      "user_matches",
    ]);

    console.log(
      "🚀 ~ file: genderedUsersController.js:46 ~ handleGenderedUsers ~ returnedUsers:",
      returnedUsers
    );
    res.json(returnedUsers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleGenderedUsers };
