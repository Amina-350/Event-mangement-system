const express = require("express");
const { createProfile } = require("../Controllers/profileController");
const authenticate = require("../Middleware/auth");
const upload = require("../utility/multer");
const joiValidator = require("../Middleware/joiValidator");
const {createProfileSchemaValidator}=require('../Validators/ProfileValidator');
const router = express.Router();
router.post(
  "/createProfile",
  authenticate,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  joiValidator(createProfileSchemaValidator),
  createProfile
);

module.exports = router;