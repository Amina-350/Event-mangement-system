import express from "express";
const router = express.Router();

import {authenticate} from "../Middleware/index.js";
import {upload} from "../utility/index.js";
import { createEventValidator } from "../Validators/index.js";

import {
  createEventController,
  getallevents,
  getsingleevent
} from "../Controllers/index.js";

import {joiValidator} from "../Middleware/index.js";
  router.post(
    "/createEvent",
    authenticate,
    upload.single("banner_image"),
    joiValidator(createEventValidator),
    createEventController,
  );
  router.get("/AllEvents", authenticate,getallevents);
  router.get('/GetSingleEvent/:id',authenticate,getsingleevent);
export default router;
