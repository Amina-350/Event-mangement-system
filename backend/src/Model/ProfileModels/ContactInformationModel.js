  
  
  const mongoose = require("mongoose");
  
  const ContactInformationModel = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
    // =====================================================
  // CONTACT INFORMATION
  // =====================================================
  email: String,
  phone: String,
  alternatePhone: String,

  contactVisibility: {
    showEmail: { type: Boolean, default: false },
    showPhone: { type: Boolean, default: false }
  },
  
},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

module.exports = mongoose.model("ContactInformationModel", ContactInformationModel);