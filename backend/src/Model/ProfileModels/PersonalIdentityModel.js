const mongoose = require("mongoose");

const PersonalIdentityModel = new mongoose.Schema({
  

  // =====================================================
  // AUTH REFERENCE
  // =====================================================
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  // =====================================================
  // PERSONAL IDENTITY
  // =======================a==============================
  firstName: String,
  middleName: String,
  lastName: String,
  displayName: String,
  username: { type: String, unique: true },

  bio: String,
  tagline: String,

  profileImage: String,
  coverImage: String,

  gender: {
    type: String,
    // enum: ["male", "female", "other", "prefer_not_to_say"]
  },

  dateOfBirth: Date,
  age: Number,

  nationality: String,
  languagesSpoken: [String],

},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

module.exports = mongoose.model("PersonalIdentityModel", PersonalIdentityModel);
