const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Luxury Boys PG near TCET"
  description: { type: String, required: true },
  
  // Link to the Owner (User Model)
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // Location Details
  address: { type: String, required: true },
  city: { type: String, required: true },
  distanceToCollege: { type: Number, required: true }, // in km
  nearbyColleges: [{ type: String }], // ["TCET", "Thakur"]

  // Financials
  rent: { type: Number, required: true },
  deposit: { type: Number, required: true },
  
  // Property Specs
  type: { 
    type: String, 
    enum: ["Boys", "Girls", "Co-ed"], 
    required: true 
  },
  sharingType: {
    type: String,
    enum: ["Single", "Double", "Triple", "Dorm"],
    required: true
  },
  amenities: [{ type: String }], // ["WiFi", "AC", "Food"]
  furnishedStatus: { 
    type: String, 
    enum: ["Fully", "Semi", "Unfurnished"], 
    default: "Semi" 
  },

  // Images (Array of file paths)
  photos: [{ type: String }], 

  isAvailable: { type: Boolean, default: true },

}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);