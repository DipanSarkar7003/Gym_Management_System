const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const uploadToCloudinary = async (filePath) => {
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) console.log("No path provided");

    // upload to cloudinary server
    const uploadResult = await cloudinary.uploader
      .upload(filePath)
      .catch((err) => console.log(err));
    return uploadResult;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = uploadToCloudinary;
