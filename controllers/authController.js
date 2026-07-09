const User = require("../models/user");
const Doctor = require("../models/doctor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWT_EXPIRES = "7d";





/*=== SIGN UP======= */
exports.signup = async (req, res) => {
  try {
    let { fullname, email, password, role } = req.body;

    // 1️⃣ Validation
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Normalize email
    email = email.toLowerCase().trim();

    // 3️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 5️⃣ Create user
    const newUser = await User.create({
      fullname: fullname.trim(),
      email,
      password: hashedPassword,
      role,
    });
    if(role === "doctor") {
      const doctorProfile = await Doctor.create({
        doctorId: newUser._id,
        specialization: "General",
      });
    }

    // 6️⃣ Generate JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, fullname: newUser.fullname},
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    // 7️⃣ Store token in HTTP-only cookie 🔐
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 8️⃣ Send response (NO token in JSON)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



/* =========================
   LOGIN
========================= */
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 1️⃣ Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    email = email.toLowerCase().trim();

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, fullname: user.fullname },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    // 5️⃣ Store token in HTTP-only cookie 🔐
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6️⃣ Send response (NO token in body)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};







/* =========================
   LOGOUT
========================= */
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};