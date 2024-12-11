const User = require("../models/user");
const bcrypt = require("bcrypt");
// const shortid = require("shortid");
// const { generateJwtToken } = require("../utils/jwtToken");

exports.signup = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Destructure input fields
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hash_password = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: req.firstName + Math.random().toString,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    // const token = generateJwtToken(savedUser._id, savedUser.role);

    // Respond with the created user and token
    const { _id, role, fullName } = savedUser;
    return res.status(201).json({
      // token,
      user: { _id, firstName, lastName, email, role, fullName },
    });
  } catch (error) {
    // Handle errors
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
