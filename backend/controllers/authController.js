const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- REGISTER CONTROLLER ---
const registerController = async (req, res) => {
  try {
    // 1. Check if file was uploaded
    const idProofPath = req.file ? req.file.path : null;

    // 2. Destructure basic fields
    const { name, email, phone, password, role } = req.body;

    // 3. Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).send({ message: "All basic fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: false, message: "Already Registered" });
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Build User Object
    const userData = {
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      idProofUrl: idProofPath, // Save file path
    };

    // 6. Handle Role-Specific Data
    if (role === 'student') {
      userData.studentProfile = {
        college: req.body.college,
        budgetMin: req.body.budgetMin, 
        budgetMax: req.body.budgetMax,
        // Safe parsing for arrays
        roomType: req.body.roomType ? (typeof req.body.roomType === 'string' ? req.body.roomType.split(',') : req.body.roomType) : [],
        amenities: req.body.amenities ? (typeof req.body.amenities === 'string' ? req.body.amenities.split(',') : req.body.amenities) : [],
      };
    } 
    else if (role === 'owner') {
      userData.ownerProfile = {
        propertyName: req.body.propertyName,
        propertyAddress: req.body.address, 
        distanceToCollege: req.body.distanceToCollege,
      };
    }

    // 7. Save to DB
    const user = await User.create(userData);

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in Registration", error });
  }
};

// --- LOGIN CONTROLLER (FIXED) ---
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 2. Check User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // 3. Check Password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // 4. Generate Token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports = { registerController, loginController };