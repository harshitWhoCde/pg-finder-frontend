const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // --- Common Fields ---
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['student', 'owner', 'admin'], default: 'student' },
  
  // Stores the path to the uploaded ID Proof/Student ID
  idProofUrl: { type: String }, 
  isVerified: { type: Boolean, default: false },

  bookmarks: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property", // 👈 Make sure this exactly matches the name in propertyModel.js
  },
],

  // --- Student Specific Fields ---
  studentProfile: {
    college: { type: String },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    roomType: [{ type: String }], // ["Single", "Double"]
    amenities: [{ type: String }], // ["WiFi", "AC"]
  },

  // --- Owner Specific Fields ---
  ownerProfile: {
    propertyName: { type: String },
    propertyAddress: { type: String },
    distanceToCollege: { type: Number },
    // You can add more property details here later
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);