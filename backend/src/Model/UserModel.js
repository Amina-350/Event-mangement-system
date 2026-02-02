const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String,  },
  email: { type: String,  unique: true },
  password: { type: String },
  gender: String,
  type: String,
  phone: String,
  address: String,
  city: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
