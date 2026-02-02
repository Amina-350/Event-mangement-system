const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder = "profiles") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result.secure_url; // returns the URL of uploaded image
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { cloudinary, uploadToCloudinary };
