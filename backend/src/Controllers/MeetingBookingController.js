import {MeetingBookingSchemaModel} from "../Model/index.js";
import { sendSuccess, sendError } from "../utility/index.js";
export const MeetingBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { EventId, Date, Time, Venue, OnlineMeetingLink, location, status } =
      req.body;
    const NewMeeting = new MeetingBookingSchemaModel({
      userId,
      EventId,
      Date,
      Time,
      Venue,
      status,
      location: Venue === "onsite" ? location : null,
      OnlineMeetingLink: Venue === "online" ? OnlineMeetingLink : null,
    });
    await NewMeeting.save();
    sendSuccess(res, NewMeeting);
  } catch (error) {
    sendError(res, error);
  }
};
export const getMyMeetings = async (req, res) => {
  try {
    const userId = req.user._id;

    const meetings = await MeetingBookingSchemaModel.find({ userId });

    sendSuccess(res, meetings);
  } catch (error) {
    sendError(res, error);
  }
};

export const getsinglemeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const singlemeeting = await MeetingBookingSchemaModel.findById(id);

    sendSuccess(res, singlemeeting);
  } catch (error) {
    sendError(res, error);
  }
};
export const getallmeetings = async (req, res) => {
  try {
    const Allmeetings = await MeetingBookingSchemaModel.find();
    sendSuccess(res, Allmeetings);
  } catch (error) {
    sendError(res, error);
  }
};
// ----------------- patch api------------
export const updateMeetingStatus = async (req, res) => {
  try {
    const { id } = req.params; // meeting id
    const { status } = req.body; // new status

    // 1️⃣ Check if status is provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    // 2️⃣ Update only status field
    const updatedMeeting = await MeetingBookingSchemaModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }, // important
    );

    // 3️⃣ If meeting not found
    if (!updatedMeeting) {
      return res.status(404).json({
        message: "Meeting not found",
      });
    }

    sendSuccess(res, updatedMeeting);
  } catch (error) {
    sendError(res, error);
  }
};

