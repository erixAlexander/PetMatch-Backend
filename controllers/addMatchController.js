const NotificationSchema = require("../model/Notification");

const handleAddMatch = async (req, res) => {
  const { userId, matchedUserId, timestamp } = req.body;

  try {
    const query = { user_id: userId };
    const updateDocument = {
      $push: {
        user_matches: { user_id: matchedUserId, notification: false, timestamp },
      },
    };
    const options = { new: true };
    const updatedUser = await NotificationSchema.findOneAndUpdate(
      query,
      updateDocument,
      options
    ).exec();
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleAddMatch };
