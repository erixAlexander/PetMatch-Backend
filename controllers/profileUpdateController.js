const Profile = require("../model/Profile");

const profileUpdate = async (req, res) => {
  const formData = req.body.formData;

  if (!formData?.user_id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
 
  const query = { user_id: formData.user_id };
  const user = await Profile.findOne(query);
  if (req?.user !== user?.email) {
    return res.status(403).json({ message: "User parameter is wrong." });
  }

  try {
    const query = { user_id: formData.user_id };
    const updateDocument = {
      first_name: formData.first_name,
      pet_name: formData.pet_name,
      dob_month: formData.dob_month,
      dob_year: formData.dob_year,
      gender_identity: formData.gender_identity,
      type_of_pet: formData.type_of_pet,
      gender_interest: formData.gender_interest,
      about: formData.about,
      looking_for: formData.looking_for,
      user_matches: formData.user_matches,
      pedigree: formData.pedigree,
    };
    const updatedUser = await Profile.findOneAndUpdate(
      query,
      updateDocument
    ).exec();
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { profileUpdate };
