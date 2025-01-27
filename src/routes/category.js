const express = require("express");
const slugify = require("slugify");
const Category = require("../models/category");
const router = express.Router();
router.post("/category/create", async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);

    const category = await cat.save(); // Use async/await here
    return res.status(201).json({ category }); // Success response
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
module.exports = router;
