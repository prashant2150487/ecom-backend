const express = require("express");
const router = express.Router();
// const User = require("../models/user");
const { signup, signin } = require("../controller/auth");
const { check } = require("express-validator");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
} = require("../validators/auth");
const { isValidObjectId } = require("mongoose");

// Signin route
router.post("/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/signin", validateSignInRequest, isRequestValidated, signin);

// // Profile route
// router.post("/profile", requireSignIn, (req, res) => {
//   res.status(200).json({
//     user: "Profile",
//   });
// });

module.exports = router;
