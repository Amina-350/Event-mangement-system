const multer = require("multer");
const path = require("path");
const uploadPath = path.join(__dirname, "../../public/uploads");
// Temporary storage before sending to Cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // temporary folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

module.exports = upload;
