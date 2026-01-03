const Application = require("../models/Application");
const Property = require("../models/property");

// 1. Submit a new application
exports.applyForPG = async (req, res) => {
    try {
        const { propertyId, phone, college, year, message } = req.body;

        const property = await Property.findById(propertyId);
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
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

exports.getStudentApplications = async (req, res) => {
    try {
        // req.user._id comes from your requireSignIn middleware
        const applications = await Application.find({ student: req.user._id })
            .populate("property", "title") // Needed to show PG name in notification
            .sort({ updatedAt: -1 }); // Latest updates (Approved/Rejected) first

        res.status(200).json({
            success: true,
            applications,
        });
    } catch (error) {
        console.error("GET STUDENT APPS ERROR:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error fetching student applications", 
            error: error.message 
        });
    }
};

// 2. Fetch applications for the Owner (Updated for Notifications)
exports.getOwnerApplications = async (req, res) => {
    try {
        // We find applications where the 'owner' field matches the logged-in user
        const applications = await Application.find({ owner: req.user._id })
            .populate("student", "name email") // Populates student name for the notification "Student Name applied..."
            .populate("property", "title rent") // Populates PG title for "applied to PG Name"
            .sort({ createdAt: -1 }); // IMPORTANT: Latest applications first for notifications

        res.status(200).json({ 
            success: true, 
            applications 
        });
    } catch (error) {
        console.error("GET APPLICATIONS ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching applications",
            error: error.message
        });
    }
};

// 3. Update Status (Approved/Rejected)
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["APPROVED", "REJECTED"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const application = await Application.findById(req.params.id);
        if (!application) return res.status(404).json({ message: "Application not found" });

        // Security check: Ensure only the owner of the property can change the status
        if (application.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this application" });
        }

        application.status = status;
        await application.save();

        res.json({ 
            success: true, 
            message: `Application ${status.toLowerCase()} successfully`,
            application 
        });
    } catch (error) {
        console.error("UPDATE STATUS ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Error updating status",
            error: error.message
        });
    }
};

