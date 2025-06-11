const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Middleware to protect routes with JWT authentication
  console.log("Auth middleware triggered");
  if (!req.headers || !req.headers.authorization) {
    return res.status(403).json({ message: "Forbidden" });
  }
  // Check for the Authorization header
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Invalid token format" });
  }
  // Extract the token from the Authorization header
  console.log("Authorization header found");
  console.log("Authorization header:", req.headers.authorization);
  console.log(
    "Authorization header split:",
    req.headers.authorization.split(" ")
  );
  console.log("Token:", req.headers.authorization.split(" ")[1]);
  console.log("Token extraction complete");

  // Verify the token
  console.log("Verifying token");
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
