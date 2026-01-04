import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ 
        success: false,
        message: "Access Denied: No Token Provided" 
      });
    }

    // This handles both raw tokens and "Bearer <token>" formats
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token using the secret from your .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to req.user (e.g., req.user._id)
    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).send({ 
      success: false,
      message: "Invalid or Expired Token" 
    });
  }
};