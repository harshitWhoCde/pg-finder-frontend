import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { 
    toggleBookmarkController, 
    getBookmarksController 
} from "../controllers/bookmarkController.js";

const router = express.Router();

// This line MUST be router.post and the path must match
router.post("/toggle-bookmark/:pid", requireSignIn, toggleBookmarkController);

router.get("/get-bookmarks", requireSignIn, getBookmarksController);

export default router;