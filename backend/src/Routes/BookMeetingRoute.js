const express=require('express');
const router=express.Router();
const authenticate = require("../Middleware/auth");
const { MeetingBooking,getMyMeetings, updateMeetingStatus, getsinglemeeting} = require('../Controllers/MeetingBookingController');
router.post('/BookMeeting',authenticate,MeetingBooking);
router.get('/getMyMeetings',authenticate,getMyMeetings);
router.get('/getsinglemeeting/:id',authenticate,getsinglemeeting);
router.patch('/updatemeetingstatus/:id',authenticate,updateMeetingStatus);
module.exports = router;