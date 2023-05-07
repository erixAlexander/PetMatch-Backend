const changeCredentials = require("../model/changeCredentials");
const bcrypt = require("bcrypt");

const handleSecurityCredentials = async (req, res) => {
  if (!req?.body?.value) {
    return res.status(400).json({ message: "This parameter is required." });
  }
  const value = req.body.value;
  const user_id = req.body.userId;
  const name = req.body.name;
  const query = { user_id: user_id };
  const user = await changeCredentials.findOne(query);
  if (req?.user !== user?.email) {
    return res.status(403).json({ message: "User parameter is wrong." });
  }
  try {
    if (name === "email") {
      const updateDocument = {
        email: value,
      };
      const updatedUser = await changeCredentials
        .findOneAndUpdate(query, updateDocument)
        .exec();
      res.status(200).send(updatedUser);
    } else if (name === "pwd") {
      const hashedPassword = await bcrypt.hash(value, 10);
      const updateDocument = {
        hashed_password: hashedPassword,
      };
      const updatedUser = await changeCredentials
        .findOneAndUpdate(query, updateDocument)
        .exec();
      res.status(200).send(updatedUser);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleSecurityCredentials,
};
