const { MongoClient } = require("mongodb");
const URI = process.env.URI;

const handleMessage = async (req, res) => {
  const client = new MongoClient(URI);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const insertedMessage = await messages.insertOne(message);
    res.status(200).send(JSON.stringify(insertedMessage));
  } catch (err) {
    console.log(err);
    res.send(err);
  } finally {
    await client.close();
  }
};

module.exports = { handleMessage };
