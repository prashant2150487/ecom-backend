const express = require("express");
const { signup, signin} = require("../../controller/admin/auth");
const router = express.Router();
// const User = require("../models/user");

// Signin route
router.post("/admin/signup", signup);
router.post("/admin/signin", signin);

// Profile route
// router.post("/profile", requireSignIn, (req, res) => {
//   res.status(200).json({
//     user: "Profile",
//   });
// });

module.exports = router;
