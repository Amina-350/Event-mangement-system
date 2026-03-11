const mongoose = require("mongoose");
const MeetingBookingSchema = require("../Model/MeetingBookingModel");
exports.MeetingBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { EventId, Date, Time, Venue,OnlineMeetingLink , location ,status} = req.body;
    const NewMeeting = new MeetingBookingSchema(
     {
      userId,
      EventId,
      Date,
      Time,
      Venue,
   status,
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

exports.getsinglemeeting = async (req, res) => {
  try {
    const {id } = req.params;

    const singlemeeting = await MeetingBookingSchema.findById(id);

    res.status(200).json({
      success: true,
      singlemeeting: singlemeeting,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// ----------------- patch api------------
exports.updateMeetingStatus = async (req, res) => {
  try {
    const { id } = req.params;   // meeting id
    const { status } = req.body; // new status

    // 1️⃣ Check if status is provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // 2️⃣ Update only status field
    const updatedMeeting = await MeetingBookingSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // important
    );

    // 3️⃣ If meeting not found
    if (!updatedMeeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    res.status(200).json({
      message: "Status updated successfully",
      updatedMeeting,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};