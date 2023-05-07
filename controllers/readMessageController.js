const { MongoClient } = require("mongodb");
const URI = process.env.URI;

const handleReadMessage = async (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ message: "This parameter is required." });
  }
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const user_id = req.body.userId;
    const match_id = req.body.match_id;
    // const user = await users.findOne({ user_id });

    // if (req?.user !== user?.email) {
    //   return res.status(403).json({ message: "User parameter is wrong." });
    // }
    users.updateOne(
      { user_id, "user_matches.user_id": match_id },
      {
        $set: {
          "user_matches.$.read": true,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleReadMessage,
};
