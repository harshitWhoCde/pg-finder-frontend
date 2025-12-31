/*const Property = require("../models/property.js");

// 1. Create a new Property
const createPropertyController = async (req, res) => {
  try {
    // We assume the user is logged in and their ID is in req.user._id
    // (We will add a middleware for this in the next step)
    const { 
      title, description, address, city, distanceToCollege, 
      rent, deposit, type, sharingType, nearbyColleges, amenities 
    } = req.body;

    // Handle Image Uploads
    // req.files is an array of files provided by Multer
    const photoPaths = req.files.map(file => file.path);

    const newProperty = await Property.create({
      title,
      description,
      owner: req.user._id, // Coming from JWT Middleware
      address,
      city,
      distanceToCollege,
      nearbyColleges: nearbyColleges.split(','), // Expecting comma-separated string
      rent,
      deposit,
      type,
      sharingType,
      amenities: amenities.split(','),
      photos: photoPaths
    });

    res.status(201).send({
      success: true,
      message: "Property Listed Successfully",
      property: newProperty
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating property",
      error
    });
  }
};

// 2. Get All Properties (For the Feed)
const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await Property.find({})
      .populate("owner", "name email phone") // Fetch owner details too
      .sort({ createdAt: -1 }); // Newest first

    res.status(200).send({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching properties",
      error
    });
  }
};

module.exports = { createPropertyController, getAllPropertiesController };*/

const Property = require("../models/property.js");

// 1. Create a new Property
const createPropertyController = async (req, res) => {
  try {
    // 1. Extract photo paths from Multer
    // These will be stored as strings like "uploads/photos-12345.jpg"
    const photoPaths = req.files ? req.files.map(file => file.path) : [];

    // 2. Parse JSON strings back into Objects/Arrays
    // FormData sends objects as strings, so we must hydrate them
    const location = req.body.location ? JSON.parse(req.body.location) : undefined;
    const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];

    // 3. Create the property document
    const newProperty = new Property({
      ...req.body, // Contains title, description, address, city, etc.
      owner: req.user._id, // Set by requireSignIn middleware
      photos: photoPaths,
      location: location,
      amenities: amenities,
      // Ensure numbers are stored as Numbers
      rent: Number(req.body.rent),
      occupancy: Number(req.body.occupancy),
      // Set status based on frontend publish/draft logic
      isActive: req.body.isActive === 'true' 
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      message: "Property Listed Successfully",
      property: newProperty
    });

  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating property",
      error: error.message
    });
  }
};

// 2. Get All Properties (For the Feed)
const getAllPropertiesController = async (req, res) => {
  try {
    console.log("Logged in User Object from Token:", req.user);
    console.log("Searching for owner ID:", req.user._id);
    // We populate "owner" to show contact info like Name/Email on the PG card
    const properties = await Property.find({ owner: req.user._id }) // Only show published ones
      .populate("owner", "name email phoneNumber") 
      .sort({ createdAt: -1 });
console.log("Found in DB:", properties);
    res.status(200).send({
      success: true,
      countTotal: properties.length,
      properties
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error fetching properties",
      error: error.message
    });
  }
};

module.exports = { createPropertyController, getAllPropertiesController };