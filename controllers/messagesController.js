const { MongoClient } = require("mongodb");
const URI = process.env.URI;

const handleMessages = async (req, res) => {
  const client = new MongoClient(URI);
  const { fromUserId, toUserId } = req.query;
  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const query = { from_user_id: fromUserId, to_user_id: toUserId };
    const returnedMessages = await messages.find(query).toArray();

    res.send(returnedMessages);
  } finally {
    await client.close();
  }
};

const handleGetLastMessage = async (req, res) => {
  const client = new MongoClient(URI);
  const { userId, correspondingUserId } = req.query;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const query = {
      $or: [
        { from_user_id: userId, to_user_id: correspondingUserId },
        { from_user_id: correspondingUserId, to_user_id: userId },
      ],
    };
    const lastMessage = await messages
      .find(query)
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    res.send(lastMessage[0]);
  } finally {
    await client.close();
  }
};

module.exports = { handleMessages, handleGetLastMessage };
