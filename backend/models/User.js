import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['student', 'owner'], required: true },
  
  // --- Student Specific Fields ---
  college: { type: String },
  budgetRange: { type: [Number] }, // Stores [min, max]
  preferredRoomType: { type: [String] },
  preferredAmenities: { type: [String] },
  
  // --- Owner Specific Fields ---
  propertyName: { type: String },
  propertyAddress: { type: String },
  propertyType: { type: String },
  totalBeds: { type: Number },
  propertyAmenities: { type: [String] },

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);