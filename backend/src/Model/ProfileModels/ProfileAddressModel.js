  
  
  const mongoose = require("mongoose");
  
  const ProfileAddressModel = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
      },
    
 // =====================================================
  // ADDRESS & LOCATION
  // =====================================================
  address: {
    country: String,
    state: String,
    city: String,
    postalCode: String,
    street: String,
    landmark: String
  },

  location: {
    latitude: Number,
    longitude: Number,
    timezone: String
  },
},
 {
  timestamps: {
    createdAt: "profileCreatedAt",
    updatedAt: "profileUpdatedAt"
  }
});

module.exports = mongoose.model("ProfileAddressModel", ProfileAddressModel);