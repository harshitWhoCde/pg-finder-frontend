const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // 1. NEW: Required for file paths
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const propertyRoutes = require("./Routes/propertyRoutes"); // 2. NEW: Import Property Routes

// Configure env
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); 
// Increase the limit to 50mb so images can pass through JSON
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. NEW: Make the "uploads" folder public
// This allows the frontend to access uploaded images via URL
// This allows the frontend to access the images via http://localhost:8080/uploads/filename.jpg
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/property", propertyRoutes); // 4. NEW: Enable Property Routes

// Test API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to PG Finder App Server</h1>");
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});