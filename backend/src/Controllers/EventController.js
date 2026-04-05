const Event = require("../Model/EventModel");
const User = require("../Model/UserModel");
const { uploadToCloudinary } = require("../utility/cloudinary");
const mongoose = require("mongoose");
const UserPreferenceTagModel = require("../Model/ProfileModels/UserPreferencesTagModel");
const {sendSuccess,sendError}=require('../utility/responseHandler');
const createEventController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "vendor") {
      return res
        .status(403)
        .json({ message: "Only vendors can create events" });
    }

    let bannerImageUrl = "";

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, "events");
      bannerImageUrl = uploadResult.secure_url;
    }

    const {
      title,
      description,
      category,
      Eventtype,
      date,
      time,
      location,
      audienceSize,
      status,
      isPaid,
      price,
      contactEmail,
      contactPhone,
      preferEvent,
      startDateTime,
      endDateTime,
    } = req.body;

    const event = new Event({
      userId,
      title,
      description,
      category,
      Eventtype,
      date,
      time,
      location,
      audienceSize,
      status,
      isPaid,
      price,
      banner_image: bannerImageUrl,
      contactEmail,
      contactPhone,
      startDateTime,
      endDateTime,
      preferEvent,
      createdBy: userId,
    });
    await event.save();
    return sendSuccess(res,event,"success");
  } catch (error) {
    return sendError(res,error,"error")
  }
}

const getsingleevent = async (req, res) => {
  try {
    const { id } = req.params;
    // ✅ Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(null,null,"invalidId",);
    }

    const singleEvent = await Event.findById(id);

    // ✅ Check if event exists
    if (!singleEvent) {
      return sendError(null,null,"event not found")
    }

  sendSuccess(res,singleEvent,"success")
  } catch (error) {
    sendError(res,error,"server error")
  }
};
const getallevents = async (req, res) => {
  try {
    // Get page from query (default = 1)
    const page = parseInt(req.query.page) || 1;

    // Fixed limit = 10
    const limit = 10;

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch events with pagination
    const events = await Event.find()
      .skip(skip)
      .limit(limit);

    // Get total count for frontend pagination
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      success: true,
      data: events,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalEvents / limit),
        totalEvents,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports= {
  createEventController,
  getsingleevent,
  getallevents,
}