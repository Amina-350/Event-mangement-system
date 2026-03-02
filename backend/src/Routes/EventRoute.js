const express = require("express");
const router = express.Router();
const authenticate = require("../Middleware/auth");
const upload = require("../utility/multer");
const {
  createEventController,
  getallevents,
  getsingleevent,
} = require("../Controllers/EventController");
router.post(
  "/createEvent",
  authenticate,
  upload.single("banner_image"),
  createEventController,
);
router.get("/AllEvents", authenticate, getallevents);
router.get('/GetSingleEvent/:id',authenticate,getsingleevent);
module.exports = router;
