const ReadMessageSchema = require("../model/ReadMessage");

const handleAddMatch = async (req, res) => {
  const { userId, matchedUserId, timestamp } = req.body;

  try {
    const query = { user_id: userId };
    const updateDocument = {
      $push: {
        user_matches: { user_id: matchedUserId, read: true, timestamp },
      },
    };
    const updatedUser = await ReadMessageSchema.findOneAndUpdate(
      query,
      updateDocument
    ).exec();
    res.send(updatedUser);
  } catch (err){
console.log(err)
  }
};

module.exports = { handleAddMatch };
