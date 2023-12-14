const Onboarding = require("../model/Onboarding");

const handleGenderedUsers = async (req, res) => {
  if (!req?.query?.gender || !req?.query?.type || !req?.query?.id) {
    return res
      .status(400)
      .json({ message: "Missing a mandatory parameter: gender, type or id." });
  }
  const { gender, type, id } = req.query;
  let query = {};

  try {
    if (gender === "any") {
      query = { type_of_pet: type };
    } else {
      query = {
        gender_identity: gender,
        type_of_pet: type,
      };
    }

    const returnedUsers = await Onboarding.find({
      $and: [
        query,
        {
          user_id: { $ne: id },
        },
      ],
    }).select([
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
