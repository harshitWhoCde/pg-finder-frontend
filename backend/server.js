const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");

// Configure env
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Fixes the "CORS error" when frontend calls backend
app.use(express.json()); // Allows app to understand JSON data

// Routes
app.use("/api/v1/auth", authRoutes);

// Test API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to PG Finder App Server</h1>");
});

// Port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});