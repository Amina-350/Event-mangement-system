const mongoose=require('mongoose');
const AuditModel=new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
  
 // =====================================================
  // =====================================================
  // AUDIT & METADATA
  // =====================================================
  isProfileComplete: { type: Boolean, default: false },
  isPublicProfile: { type: Boolean, default: true }
},
 
  {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
}
)
module.exports=mongoose.model('AuditModel',AuditModel)