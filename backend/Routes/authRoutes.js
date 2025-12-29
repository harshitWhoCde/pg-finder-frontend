const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const upload = require("../config/multer"); // Import middleware

const router = express.Router();

// Register Route (Now handles 'idProof' file)
router.post("/register", upload.single("idProof"), registerController);

// Login Route
router.post("/login", loginController);

module.exports = router;