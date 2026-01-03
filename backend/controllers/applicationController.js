const Application = require("../models/Application");
const Property = require("../models/property");

exports.applyForPG = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    console.log("REQ.BODY:", req.body);

    const { propertyId, phone, college, year, message } = req.body;

    const property = await Property.findById(propertyId);
    console.log("PROPERTY:", property);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "PG not found",
      });
    }

    const application = await Application.create({
      student: req.user._id,
      owner: property.owner,
      property: propertyId,
      studentDetails: { phone, college, year, message },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};


exports.getOwnerApplications = async (req, res) => {
  const applications = await Application.find({ owner: req.user._id })
    .populate("student", "name email")
    .populate("property", "title rent");

  res.json({ success: true, applications });
};

exports.updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const application = await Application.findById(req.params.id);
  if (!application) return res.status(404).json({ message: "Not found" });

  if (application.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  application.status = status;
  await application.save();

  res.json({ success: true, application });
};
