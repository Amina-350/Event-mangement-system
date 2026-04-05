  const express = require("express");
  const router = express.Router();
  const authenticate = require("../Middleware/auth");
  const upload = require("../utility/multer");
  const {createEventValidator}=require('../Validators/EventValidator');
  const {
    createEventController,
    getallevents,
    getsingleevent,
  } = require("../Controllers/EventController");
const joiValidator = require("../Middleware/joiValidator");
  router.post(
    "/createEvent",
    authenticate,
    upload.single("banner_image"),
    joiValidator(createEventValidator),
    createEventController,
  );
  router.get("/AllEvents", authenticate,getallevents);
  router.get('/GetSingleEvent/:id',authenticate,getsingleevent);
  module.exports = router;
