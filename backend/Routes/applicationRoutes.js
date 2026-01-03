const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const {
  applyForPG,
  getOwnerApplications,
  updateApplicationStatus,
  getStudentApplications,
} = require("../controllers/applicationController");

const router = express.Router();
router.get("/student-applications", requireSignIn, getStudentApplications);
router.post("/apply", requireSignIn, applyForPG);
router.get("/owner-applications", requireSignIn, getOwnerApplications);
// Change this line in applicationRoutes.js
router.put("/update-status/:id", requireSignIn, updateApplicationStatus);

module.exports = router;
