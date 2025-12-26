import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    // 1. Destructure ALL possible fields from the frontend
    const { 
      name, email, password, phone, role, 
      college, budgetRange, roomType, amenities, // Student fields
      propertyName, address, propertyType, totalBeds // Owner fields
    } = req.body;

    // 2. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User (Pass relevant fields based on role)
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      // We can pass all; Mongoose will ignore ones not in schema if strictly defined, 
      // but since we added them to schema, they will be saved.
      college,
      budgetRange,
      preferredRoomType: roomType,     // Mapping frontend name to DB name
      preferredAmenities: amenities,   // Mapping frontend name to DB name
      propertyName,
      propertyAddress: address,
      propertyType,
      totalBeds,
      propertyAmenities: amenities     // Owner amenities
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully", 
      success: true,
      user: { name: newUser.name, email: newUser.email, role: newUser.role } 
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

export const login = async (req, res) => {
    // ... (Keep your login logic here)
};