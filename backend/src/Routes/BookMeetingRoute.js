import express from "express";
const router = express.Router();

import {authenticate} from "../Middleware/index.js";
import { 
  MeetingBooking,
  getMyMeetings,
  updateMeetingStatus,
  getsinglemeeting,
  getallmeetings
} from "../Controllers/index.js";

import { meetingBookingValidator } from "../Validators/index.js";
import {joiValidator} from "../Middleware/index.js";
router.post('/BookMeeting',authenticate,joiValidator(meetingBookingValidator), MeetingBooking);
router.get('/getMyMeetings',authenticate,getMyMeetings);
router.get('/getsinglemeeting/:id',authenticate,getsinglemeeting);
router.get('/getallmeetings',authenticate,getallmeetings);
router.patch('/updatemeetingstatus/:id',authenticate,updateMeetingStatus);
export default router;