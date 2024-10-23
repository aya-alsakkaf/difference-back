const Category = require("../../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

module.exports = { getCategories };

const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

module.exports = { getCategories, createCategory };

const getOneCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
};

module.exports = { getCategories, createCategory, getOneCategory };
