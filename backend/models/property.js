/*const mongoose = require("mongoose");

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
*/

const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  
  // Link to the Owner
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  ownerName: { type: String, required: true }, // From form: ownerName
  phoneNumber: { type: String, required: true }, // From form: phoneNumber

  // Location Details
  address: { type: String, required: true },
  city: { type: String, required: true },
  // GeoJSON for Map functionality
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
   

  // Financials
  rent: { type: Number, required: true },
  
  
  // Property Specs
  type: { 
    type: String, 
    enum: ["PG", "Hostel", "Flat"], 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Any"], 
    default: "Any" 
  },
  occupancy: { type: Number, required: true }, // Total beds/capacity
  sharingType: {
    type: String,
    enum: ["Single", "Double", "Triple", "Dorm"],
  },
  amenities: [{ type: String }], 
  

  // Policies & Rules
  houseRules: { type: String },
  ownerPolicies: { type: String },
  petPolicy: { 
    type: String, 
    default: "Not Allowed" 
  },
  visitorPolicy: { 
    type: String, 
    default: "Allowed with Restrictions" 
  },

  // Images & Status
  photos: [{ type: String }], 
  isActive: { type: Boolean, default: true }, // From form: isActive

}, { timestamps: true });

// Index for Geospatial queries (finding PGs near a location)
propertySchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);