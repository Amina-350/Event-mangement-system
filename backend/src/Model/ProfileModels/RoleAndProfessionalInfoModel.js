
  const mongoose = require("mongoose");
  const RoleProfessionalInfoModel=new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
  // =====================================================
  // ROLE & PROFESSIONAL DETAILS
  // =====================================================
  role: {
    type: String,
    enum: ["admin", "organizer", "attendee", "vendor"],
    default: "attendee"
  },

  organizationName: String,
  organizationType: {
    type: String,
    enum: ["individual", "company", "agency"]
  },

  designation: String,
  aboutOrganization: String,
  companyWebsite: String,

  experienceYears: Number,
  skills: [String],
  certifications: [String],

  },
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
})
  module.exports=mongoose.model('RoleProfessionalInfoModel',RoleProfessionalInfoModel)
