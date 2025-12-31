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