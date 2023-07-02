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
      .find(
        { activity: activity, user_id: { $not: regex } },
        {
          email: 1,
          images: 1,
          pet_name: 1,
          user_id: 1,
          about: 1,
          activity: 1,
          address_info: 1,
          dob_year: 1,
          distance: 1,
          gender_identity: 1,
          looking_for: 1,
          pedigree: 1,
          user_matches: 1,
        }
      )
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
