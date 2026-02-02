const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("the decoded data is ---->".decoded);
     // ✅ Normalize user object
    req.user = {
      _id: decoded.userId,
      // email: decoded.email,
      // type: decoded.type
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
