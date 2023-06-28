const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");

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
    if (formData.password) {
      formData.hashed_password = await bcrypt.hash(formData?.password, 10);
      delete formData.password;
    }
    console.log(formData);

    const updateDocument = formData;
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
