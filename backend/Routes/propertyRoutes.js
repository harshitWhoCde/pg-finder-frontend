const express = require("express");
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

module.exports = router;