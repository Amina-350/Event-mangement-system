const mongoose=require('mongoose');
const PrivacyModel=new mongoose.Schema({
  
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
  // =====================================================
  // PRIVACY & VISIBILITY
  // =====================================================
  profileVisibility: {
    type: String,
    enum: ["public", "private", "connections_only"],
    default: "public"
  },

  searchable: { type: Boolean, default: true },
  allowMessages: { type: Boolean, default: true },

  blockedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
})
module.exports=mongoose.model('PrivacyModel',PrivacyModel)