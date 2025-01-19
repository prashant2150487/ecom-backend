const express = require("express");
const router = express.resouter();
router.post("/category/create", (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: req.body.slug,
    parentId: req.body.parentId,
  };
});
