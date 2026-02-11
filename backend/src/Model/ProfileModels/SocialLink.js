  
  
  const mongoose = require("mongoose");
  
  const ProfileSocialModel = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
 // =====================================================
  // SOCIAL & ONLINE PRESENCE
  // =====================================================
  socialLinks: {
    website: String,
    linkedin: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  },

},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

module.exports = mongoose.model("ProfileSocialModel", ProfileSocialModel);