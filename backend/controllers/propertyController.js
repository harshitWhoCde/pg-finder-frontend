const Property = require("../models/property.js");

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

module.exports = { createPropertyController, getAllPropertiesController };