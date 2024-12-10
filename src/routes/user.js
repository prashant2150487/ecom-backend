const express = require("express");
const router = express.Router();

// Signin route
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  res.status(200).json({ message: "Signin successful!", email });
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }
  res.status(201).json({ message: "Signup successful!", name, email });
});

module.exports = router;
