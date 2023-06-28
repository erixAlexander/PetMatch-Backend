const { MongoClient } = require("mongodb");
const URI = process.env.URI;

const handleDeleteImages = async (req, res) => {
  const user_id = req?.body?.params.user_id;
  const id = req?.body?.params.id;
  if (!user_id || !id) {
    return res.status(400).json({ message: "This parameter is required." });
  }

  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const response = await users.updateOne(
      { user_id: user_id, "images.id": id },
      {
        $pull: {
          images: { id: id },
        },
      }
    );
    res.status(201).json({ response });
  } catch (err) {
    console.log(err);
  }
};

const handleUpdateImages = async (req, res) => {
  const user_id = req?.body?.params?.user_id;
  const id = req.body?.params?.id;
  const image = req?.cloudinaryImage;
  if (!user_id || !image) {
    return res.status(400).json({ message: "This parameter is required." });
  }
  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const response = await users.updateOne(
      { user_id: user_id, "images.id": id },
      {
        $set: {
          "images.$": image,
        },
      }
    );
    res.status(201).json({ response, image });
  } catch (err) {
    console.log(err);
  }
};

const handleAddImages = async (req, res) => {
  const user_id = req?.body?.params?.user_id;
  const image = req?.cloudinaryImage;
  if (!user_id || !image) {
    return res.status(400).json({ message: "This parameter is required." });
  }
  try {
    const client = new MongoClient(URI);
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const response = await users.updateOne(
      { user_id: user_id },
      {
        $push: {
          images: image,
        },
      }
    );
    res.status(201).json({ response, image });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handleDeleteImages,
  handleUpdateImages,
  handleAddImages,
};
