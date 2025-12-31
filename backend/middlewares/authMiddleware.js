/*const jwt = require("jsonwebtoken");

// Protected Routes Token Base
const requireSignIn = async (req, res, next) => {
  try {
    // Client sends token in header: "Authorization: Bearer <token>"
    const token = req.headers.authorization; 
    
    if (!token) {
      return res.status(401).send({ message: "Access Denied: No Token Provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user ID to request object
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Invalid Token" });
  }
};

module.exports = { requireSignIn };*/

const jwt = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    
    if (!authHeader) {
      return res.status(401).send({ message: "Access Denied: No Token Provided" });
    }

    // FIX: Check if it starts with "Bearer " and split it
    // This extracts only the token part
    const token = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to req.user
    // Usually, tokens contain { _id: "..." }. 
    // Make sure your controller uses req.user._id (or whatever your payload key is)
    req.user = decoded; 
    
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).send({ message: "Invalid or Expired Token" });
  }
};

module.exports = { requireSignIn };