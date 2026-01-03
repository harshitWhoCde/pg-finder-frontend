const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./Routes/authRoutes");
const propertyRoutes = require("./Routes/propertyRoutes");
const applicationRoutes = require("./Routes/applicationRoutes");

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
// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   ROUTES
======================= */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/applications", applicationRoutes);

/* =======================
   ROOT TEST ROUTE
======================= */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to PG Finder App Server</h1>");
});

/* =======================
   GLOBAL ERROR HANDLER (SAFE)
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
