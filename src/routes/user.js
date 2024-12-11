const express = require("express");
const router = express.Router();
const User = require("../models/user");
// const { signup } = require("../controller/user.js");
const { signup, signin } = require("../controller/user");

// Signin route
router.post("/signup", signup);

module.exports = router;
