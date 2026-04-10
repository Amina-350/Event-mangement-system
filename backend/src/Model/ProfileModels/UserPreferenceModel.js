import mongoose from "mongoose";
const UserPreferenceModel=new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
  
  // =====================================================
  // USER PREFERENCES
  // =====================================================
  interests: [String],
  favoriteVenues: [String],

  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: true },
    whatsapp: { type: Boolean, default: false }
  },

  languagePreference: String,
  currencyPreference: String,
},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
})
export const UserPreferenceModelSchema= mongoose.model('UserPreferenceModel',UserPreferenceModel)