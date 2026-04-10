import mongoose from "mongoose";

const UserPreferenceTagModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  // =====================================================
  // USER PREFERENCES tags
  // =====================================================
  eventPreferences: {
    corporateEvents: { type: Boolean, default: false },
    socialAndPersonalEvents: { type: Boolean, default: false },
    educationalEvents: { type: Boolean, default: false },
    culturalAndEntertainment: { type: Boolean, default: false },
    sportsEvents: { type: Boolean, default: false },
    brandEvents: { type: Boolean, default: false }
  }

}, {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

export const UserPreferenceTagModelSchema= mongoose.model('UserPreferenceTagModel', UserPreferenceTagModel);