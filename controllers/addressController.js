const changeAddress = require("../model/address");

const handleAddress = async (req, res) => {
  if (!req?.body?.user_id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }
  const query = { user_id: req.body.user_id };
  const user = await changeAddress.findOne(query);

  if (req?.user !== user?.email) {
    return res.status(403).json({ message: "User parameter is wrong." });
  }
  const addressInfo = req.body.addressInfo;
  const distance = req.body.distance;
  let updateDocument;
  try {
    if (addressInfo && !distance) {
      updateDocument = {
        address_info: addressInfo,
      };
    }
    if (!addressInfo && distance) {
      updateDocument = {
        distance: distance,
      };
    }
    const updatedUser = await changeAddress
      .findOneAndUpdate(query, updateDocument)
      .exec();
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleAddress,
};
