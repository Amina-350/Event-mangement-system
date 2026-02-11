const express=require('express');
const router = express.Router();
const authenticate=require('../Middleware/auth');
const upload=require('../utility/multer');
const { createEventController } = require('../Controllers/EventController');
router.post('/createEvent',authenticate,
     upload.fields([
    { name: " banner_image", maxCount: 1 },
   
  ]),createEventController);
  module.exports = router;