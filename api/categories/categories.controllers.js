const Category = require("../../models/Category");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories };

const createCategory = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory };

const getOneCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory, getOneCategory };
