/*const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const { createPropertyController, getAllPropertiesController } = require("../controllers/propertyController");
const upload = require("../config/multer"); // Reuse your multer config

const router = express.Router();

// POST /api/v1/property/create
// We use 'upload.array("photos", 5)' to allow up to 5 images
router.post(
  "/create", 
  requireSignIn, 
  upload.array("photos", 5), 
  createPropertyController
);

// GET /api/v1/property/get-all
router.get("/get-all", getAllPropertiesController);

module.exports = router;*/
// Add this line
const Property = require("../models/property.js");
const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const { 
  createPropertyController, 
  getAllPropertiesController 
} = require("../controllers/propertyController");
const upload = require("../config/multer"); // Multer configuration

const router = express.Router();

// POST /api/v1/property/create
// Ensure the name "photos" matches your frontend data.append('photos', ...)
// Increased limit to 10 for better property showcasing
router.post(
  "/add", 
  requireSignIn, 
  upload.array("photos", 10), 
  createPropertyController
);


// PUT /api/v1/property/update/:id
router.put("/update/:id", requireSignIn, async (req, res) => {
  try {
    const { id } = req.params;
    // Find the property and update it with the data from req.body
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true } // This returns the updated document instead of the old one
    );

    if (!updatedProperty) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      message: "Property Updated Successfully",
      updatedProperty,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating property",
      error,
    });
  }
});

// Backend Route (propertyRoutes.js)
router.delete('/delete/:id', requireSignIn, async (req, res) => {
  try {
    const { id } = req.params;
    
    // IMPORTANT: Changed PropertyModel to Property to match your import at the top
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ 
        success: false, 
        message: "Property not found in database" 
      });
    }

    res.status(200).send({ 
      success: true, 
      message: "Property deleted from database successfully" 
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).send({ 
      success: false, 
      message: "Server error during deletion",
      error: error.message 
    });
  }
});


// GET /api/v1/property/get-all
router.get("/get-all", getAllPropertiesController);
// Get properties only for the logged-in owner
router.get("/owner-properties", requireSignIn, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log("SERVER ERROR:", error); // Look at your Terminal/Command Prompt for this!
  res.status(500).json({ 
    success: false, 
    message: "Error fetching owner properties", 
    error: error.message // Use .message to ensure it's not an empty object
  });
  }
});
module.exports = router;