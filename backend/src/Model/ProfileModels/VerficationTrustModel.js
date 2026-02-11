const mongoose=require('mongoose');
const VerficationTrustModel=new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
  
 // =====================================================
  // VERIFICATION & TRUST
  // =====================================================

    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    profileVerified: { type: Boolean, default: false },
    verificationBadge: {
      type: String,
      enum: ["none", "basic", "verified"],
      default: "none"
    }
  ,

},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
})
module.exports=mongoose.model('VerficationTrustModel',VerficationTrustModel)