const { cloudinary } = require("../utils/cloudinary");

const cloudinaryImages = async (req, res, next) => {
 
  try {
    const fileStrs = req.body.formData?.images || req.body.cleanFormData?.images
    if (!fileStrs) {
      next();
      return
    }
    if (fileStrs?.length > 5 ) return res.sendStatus(401);
    const responsesArray = [];
    const promises = fileStrs.map((file) => {
      return cloudinary.uploader
        .upload(file, {
          upload_preset: "petmatch",
          maxImageWidth: 350,
          timeout:120000
        })
        .then((result) => {
          console.log("*** Success: Cloudinary Upload", result);
          responsesArray.push({id : result.public_id, url :result.url});
        })
        .catch((err) => {
          console.log("*** Error: Cloudinary Upload", err);
        });
    });
    await Promise.all(promises).then(result =>  {
        req.imagesArray = responsesArray
        next();
    })
    .catch((error) => console.log(error))
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

module.exports = cloudinaryImages;
