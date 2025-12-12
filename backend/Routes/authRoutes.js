const express = require("express");
const { registerController, loginController } = require("../controllers/authController");

const router = express.Router();

// Routing
// METHOD: POST || URL: /api/v1/auth/register
router.post("/register", registerController);

// METHOD: POST || URL: /api/v1/auth/login
router.post("/login", loginController);

module.exports = router;