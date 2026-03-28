const Event = require("../Model/EventModel")
const User = require("../Model/UserModel")
const { uploadToCloudinary } = require("../utility/cloudinary")
const mongoose = require("mongoose");
const UserPreferenceTagModel=require('../Model/ProfileModels/UserPreferencesTagModel')

exports.createEventController = async (req, res) => {
   
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

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
      
      preferEvent,
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
      
      startDateTime,
      endDateTime,
      preferEvent,
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
    const userId = req.user._id;

    // 1. Get user preferences
    const userPref = await UserPreferenceTagModel.findOne({ userId });

    if (!userPref) {
      return res.status(404).json({
        success: false,
        message: "User preferences not found",
      });
    }

    const prefs = userPref.eventPreferences;

    // 2. Convert TRUE preferences into array
    let preferredTags = [];

    if (prefs.corporateEvents) preferredTags.push("corporateEvents");
    if (prefs.socialAndPersonalEvents) preferredTags.push("socialAndPersonalEvents");
    if (prefs.educationalEvents) preferredTags.push("educationalEvents");
    if (prefs.culturalAndEntertainment) preferredTags.push("culturalAndEntertainment");
    if (prefs.sportsEvents) preferredTags.push("sportsEvents");
    if (prefs.brandEvents) preferredTags.push("brandEvents");

    let events;

    // 3. If no preferences → return ALL events
    if (preferredTags.length === 0) {
      events = await Event.find({});
    } else {
      // 4. Filter by preferences
      events = await Event.find({
        preferEvent: { $in: preferredTags },
      });
    }


    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
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