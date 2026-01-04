import userModel from "../models/User.js";
import propertyModel from "../models/property.js";
// Fetch all bookmarked PGs for a student
export const getBookmarksController = async (req, res) => {
    try {
        // req.user._id comes from the requireSignIn middleware
        const user = await userModel.findById(req.user._id).populate("bookmarks");
        
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        const cleanBookmarks = user.bookmarks.filter(pg => pg !== null);
res.status(200).send({
    success: true,
    bookmarks: cleanBookmarks,
});
    } catch (error) {
        console.error("Get Bookmarks Error:", error);
        res.status(500).send({
            success: false,
            message: "Error fetching bookmarks",
            error: error.message,
        });
    }
};

// Add or Remove a PG from bookmarks
export const toggleBookmarkController = async (req, res) => {
    try {
        const { pid } = req.params;
        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // 🛡️ FIX: If bookmarks is undefined/null, initialize it as an empty array
        if (!user.bookmarks) {
            user.bookmarks = [];
        }

        const index = user.bookmarks.indexOf(pid);
        
        if (index === -1) {
            user.bookmarks.push(pid); // Add
        } else {
            user.bookmarks.splice(index, 1); // Remove
        }

        await user.save();
        
        res.status(200).send({
            success: true,
            message: index === -1 ? "Added to bookmarks" : "Removed from bookmarks",
            bookmarks: user.bookmarks
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error toggling bookmark",
            error: error.message,
        });
    }
};