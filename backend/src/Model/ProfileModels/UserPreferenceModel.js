const mongoose=require('mongoose');
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
module.exports=mongoose.model('UserPreferenceModel',UserPreferenceModel)