import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js"; // Ensure .js extension

// Routes Imports
import authRoutes from "./Routes/authRoutes.js";
import propertyRoutes from "./Routes/propertyRoutes.js";
import applicationRoutes from "./Routes/applicationRoutes.js";
import bookmarkRoutes from "./Routes/bookmarkRoutes.js"; // Added this

// Fixing __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* =======================
   STATIC FILES
======================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes); // Integrated here

/* =======================
   ROOT TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to PG Finder App Server</h1>");
});

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});