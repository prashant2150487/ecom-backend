const express = require("express");
const { signup, signin } = require("../../controller/admin/auth");
const {
  isRequestValidated,
  validateSignUpRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signup", validateSignUpRequest, isRequestValidated, signup);
router.post("/admin/signin", signin);

module.exports = router;
