const jwt = require("jsonwebtoken");

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

module.exports = { requireSignIn };