const { MongoClient } = require("mongodb");
const URI = process.env.URI;

const handleAddActivity = async (req, res) => {
  const { userId, activity } = req?.body?.params;

  if (!userId) {
    return res.status(400).json({ message: "This parameter is required." });
  }

  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const response = await users.updateOne(
      { user_id: userId },
      {
        $set: { activity: activity },
      }
    );

    res.status(201).json({ response });
  } catch (err) {
    console.log(err);
  }
};

const handleGetActivityUsers = async (req, res) => {
  const { userId, activity } = req?.query;
  if (!activity) {
    return res.status(400).json({ message: "This parameter is required." });
  }

  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const regex = new RegExp(`^${userId}$`);
    const response = await users
      .find({ activity: activity, user_id: { $not: regex } })
      .toArray();

    res.status(201).json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleAddActivity,
  handleGetActivityUsers,
};
