import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String,  unique: true },
  password: { type: String },
  gender: String,
  role:{
    type:String,
 enum: ["user", "vendor", "admin"],
 default:"user",
  },
  phone: String,
  address: String,
  city: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User= mongoose.model("User", userSchema);