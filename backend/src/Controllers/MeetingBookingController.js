const mongoose = require("mongoose");
const MeetingBookingSchema = require("../Model/MeetingBookingModel");
exports.MeetingBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { EventId, Date, Time, Venue,OnlineMeetingLink , location } = req.body;
    const NewMeeting = new MeetingBookingSchema(
     {
      userId,
      EventId,
      Date,
      Time,
      Venue,
    location: Venue === "onsite" ? location : null,
      OnlineMeetingLink: Venue === "online" ? OnlineMeetingLink : null
     }
    );
    await NewMeeting.save();
      res.status(201).json({
      message: "Event created successfully",
      NewMeeting
    })
  } catch(error) {
  res.json({
    message:"server error",
    error:error.message,
  })

  }
};
exports.getMyMeetings = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetings = await MeetingBookingSchema.find({ userId })


    res.status(200).json({
      success: true,
      meetings
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};