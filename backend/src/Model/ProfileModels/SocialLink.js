  
  import mongoose from "mongoose";
  
  const ProfileSocialModel = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
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

export const ProfileSocialModelSchema= mongoose.model("ProfileSocialModel", ProfileSocialModel);