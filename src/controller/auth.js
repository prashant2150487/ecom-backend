const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// const shortid = require("shortid");

exports.signup = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res.status(400).json({ error: "Enter firstName" });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: req.firstName + Math.random().toString(),
    });

    const savedUser = await newUser.save();
    // const token = generateJwtToken(savedUser._id, savedUser.role);
    const { _id, role, fullName } = savedUser;
    console.log("Signup successful");
    return res.status(201).json({
      // token,
      user: { _id, firstName, lastName, email, role, fullName },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.hash_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateJwtToken(user._id, user.role);

    // Respond with user details and token
    const { _id, firstName, lastName, role, fullName } = user;
    console.log("Signin successful");
    return res.status(200).json({
      message: "Signin successful",
      token,
      user: { _id, firstName, lastName, email, role, fullName },
    });
  } catch (error) {
    // Handle unexpected errors
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.requireSignIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  console.log(token, user, process.env.JWT_SECRET);
  next();
  // jwt.decode()
};
