const express=require('express');
const router=express.Router();
const authenticate = require("../Middleware/auth");
const { MeetingBooking,getMyMeetings} = require('../Controllers/MeetingBookingController');
router.post('/BookMeeting',authenticate,MeetingBooking);
router.get('/getMyMeetings',authenticate,getMyMeetings);
module.exports = router;