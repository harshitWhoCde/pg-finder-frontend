const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const {
  applyForPG,
  getOwnerApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/apply", requireSignIn, applyForPG);
router.get("/owner", requireSignIn, getOwnerApplications);
router.put("/:id/status", requireSignIn, updateApplicationStatus);

module.exports = router;
