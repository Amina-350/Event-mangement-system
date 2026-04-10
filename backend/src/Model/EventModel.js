import mongoose from "mongoose";
// Event Schema
const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    Eventtype: {
      type: String,
      enum: ["online", "physical", "hybrid"],
    },
   preferEvent: [
  {
    type: String,
    enum: [
      "corporateEvents",
      "socialAndPersonalEvents",
      "educationalEvents",
      "culturalAndEntertainment",
      "sportsEvents",
      "brandEvents",
    ],
  },
],
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    location: {
      address: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      latitude: String,
      longitude: String,
    },
    audienceSize: {
      type: String,
      enum: ["small", "medium", "large"],
    },

    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      default: 0,
    },
    banner_image: String,
    contactEmail: String,
    contactPhone: String,
  

    startDateTime: Date,
    endDateTime: Date,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true },
);

export const Event= mongoose.model("Event", eventSchema);
