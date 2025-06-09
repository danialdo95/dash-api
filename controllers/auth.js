const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const User = require('../models/User'); // Assuming you have a User model defined


exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  // const existingUser = await User.find ({ username });
  // if (existingUser) {
  //     return res.status(400).json({ message: 'User already exists' });
  // }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user
  // const newUser = new User({ username, password: hashedPassword });
  // await newUser.save();
  // Respond with success
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  // const user = await User
  //.findOne({ username });
  // if (!user) {
  //     return res.status(400).json({ message: 'Invalid username or password' });
  // }
  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  // Respond with the token
  res.json({ token });
};

// exports.protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
//   // Verify the token
//   jwt.verify(token, "your_jwt_secret", (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = decoded; // Attach user info to request
//     next(); // Proceed to the next middleware or route handler
//   });
// };


// Example protected route
// app.get('/api/protected', authController.protect, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });
