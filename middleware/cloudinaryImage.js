const { cloudinary } = require("../utils/cloudinary");

const cloudinaryImage = async (req, res, next) => {
  try {
    const fileStr = req.body.params?.image;
    if (!fileStr) {
      next();
      return;
    }
    if (typeof fileStr != "string") return res.sendStatus(401);
    
    const result = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "petmatch",
      maxImageWidth: 350,
      timeout: 120000,
    });
    let cloudImage = { id: result.public_id, url: result.secure_url };

    req.cloudinaryImage = cloudImage;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

module.exports = cloudinaryImage;
