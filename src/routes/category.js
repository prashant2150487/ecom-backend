const express = require("express");

const { addCategory, getCategory } = require("../controller/category");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const router = express.Router();

router.post("/category/create", requireSignIn, adminMiddleware, addCategory);
router.get("/category/getcategory", getCategory)
module.exports = router;
