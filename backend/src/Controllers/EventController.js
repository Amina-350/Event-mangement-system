const Event = require("../Model/EventModel")
const User = require("../Model/UserModel")
const { uploadToCloudinary } = require("../utility/cloudinary")
const mongoose = require("mongoose");

exports.createEventController = async (req, res) => {
    console.log("the id isss====>")
  try {
    const userId = req.user._id
    console.log("the id isss====>",userId)

    const user = await User.findById(userId)
    console.log("the id isss====>",user)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    console.log("the role is ------>",user.role)

    if (user.role !== "vendor") {
      return res.status(403).json({ message: "Only vendors can create events" })
    }

    let bannerImageUrl = ""

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, "events")
      bannerImageUrl = uploadResult.secure_url
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
      tags,
      startDateTime,
      endDateTime
    } = req.body

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
      tags,
      startDateTime,
      endDateTime,
      createdBy: userId
    })

    await event.save()

    return res.status(201).json({
      message: "Event created successfully",
      event
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create event",
      error: error.message
    })
  }
},

exports.getallevents = async (req, res) => {
  try {
    // Get page & limit from query
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);

    const skip = (page - 1) * limit;

    const totalEvents = await Event.countDocuments();

    const events = await Event.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt:1 });

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalEvents / limit),
      totalEvents,
      events,
    });

  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
};
exports.getsingleevent = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Event ID",
      });
    }

    const singleEvent = await Event.findById(id);

    // ✅ Check if event exists
    if (!singleEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data:singleEvent,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};