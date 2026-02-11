const mongoose=require('mongoose');
const EventProfileModel=new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
  //===================================================
  // EVENT-RELATED PROFILE DATA
  //=====================================================
  eventExpertise: {
    type: [String],
    enum: ["Tech", "Music", "Corporate", "Wedding", "Sports", "Education"]
  },

  preferredEventTypes: {
    type: [String],
    enum: ["online", "physical", "hybrid"]
  },

  preferredAudienceSize: {
    type: String,
    enum: ["small", "medium", "large"]
  },

  availabilityStatus: {
    type: String,
    enum: ["available", "busy", "unavailable"],
    default: "available"
  },


},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
})
module.exports=mongoose.model('EventProfileModel',EventProfileModel)