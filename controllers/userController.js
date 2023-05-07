const onboarding = require("../model/Onboarding");

const updateUserInfo = async (req, res) => {
  const formData = req.body.formData;
  if (!req?.body?.formData?.user_id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const query = { user_id: formData.user_id };
  const user = await onboarding.findOne(query);
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
      images: req.imagesArray,
      pedigree: formData.pedigree,
      distance: formData.distance,
      address_info: formData.address_info,
      activity: formData.activity,
    };
    const updatedUser = await onboarding
      .findOneAndUpdate(query, updateDocument)
      .exec();
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

const getUserInfo = async (req, res) => {
  const reqUser = req.user;
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  try {
    const query = { user_id: userId };
    const user = await onboarding.findOne(query);

    if (reqUser !== user?.email) {
      return res.status(403).json({ message: "User parameter is wrong." });
    }
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
