const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connects to the database using the URL from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Error: ${error}`);
    process.exit(1); // Stop the app if DB connection fails
  }
};

module.exports = connectDB;