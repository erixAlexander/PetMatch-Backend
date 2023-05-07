const { MongoClient } = require("mongodb");
const URI = process.env.URI;
const ReadMessageSchema = require("../model/ReadMessage")

const handleWriteMessage = async (req, res) => {
  
  if (!req?.body?.clickedUserId) {
    return res.status(400).json({ message: "This parameter is required." });
  }
  const user_id = req.body.myUserId;
  const match_id = req.body.clickedUserId;

  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    users.updateOne(
      { user_id: match_id, "user_matches.user_id": user_id },
      {
        $set: {
          "user_matches.$.read": false,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleWriteMessage,
};
