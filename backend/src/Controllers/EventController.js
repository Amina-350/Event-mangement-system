const Event = require("../Model/EventModel")
const User = require("../Model/UserModel")
const { uploadToCloudinary } = require("../utility/cloudinary")


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
}
