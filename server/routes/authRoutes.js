const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log("Registering user:", { username, email, password });

    // Check if User Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create User Without Manual Hashing (Handled in User Schema)
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received:", { email, password });

    // Find User by Email
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ message: "User not found." });
    }

    // Debugging: Print Stored Hashed Password
    console.log("Stored hashed password:", user.password);

    // Compare Entered Password with Hashed Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password does not match for email:", email);
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate Token if Password is Correct
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful for:", email);
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Info (For Order History or Chat)
router.get("/user", async (req, res) => {
  try {
    // Extract Token Correctly
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // Verify Token
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (error) {
    console.error("Error in /user:", error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }

    res.status(401).json({ message: "Invalid Token" });
  }
});

module.exports = router;
