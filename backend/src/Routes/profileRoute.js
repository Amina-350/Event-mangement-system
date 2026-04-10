import express from "express";
const router = express.Router();

import { createProfile } from "../Controllers/index.js";
import {authenticate} from "../Middleware/auth.js";
import {upload} from "../utility/index.js";
import {joiValidator} from "../Middleware/index.js";
import { createProfileSchemaValidator } from "../Validators/index.js";
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

export default router;