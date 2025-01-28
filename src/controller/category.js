const { default: slugify } = require("slugify");
const Category = require("../models/category");

exports.addCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    };
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);

    const category = await cat.save();
    return res.status(201).json({ category });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
