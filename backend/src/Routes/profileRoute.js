const express = require("express");
const { createProfile } = require("../Controllers/profileController");
const authenticate = require("../Middleware/auth");
const upload = require("../utility/multer");
const router = express.Router();
router.post(
  "/createProfile",
  authenticate,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createProfile
);
module.exports = router;