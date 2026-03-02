const mongoose = require("mongoose");
const MeetingBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,

  },
  EventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  Date: {
    type: Date,
  },
  Time: {
    type: String,
  },
  Venue: {
    type: String,
    enum: ["online", "onsite"],
  },
  OnlineMeetingLink: {
    type: String,
  },
  location: {
    type: String,
  },
});
module.exports = mongoose.model("MeetingBookingSchema", MeetingBookingSchema);
