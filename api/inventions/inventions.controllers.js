const Invention = require("../../models/Invention");

const getInventions = async (req, res, next) => {
  try {
    const inventions = await Invention.find();
    res.status(200).json(inventions);
  } catch (error) {
    next(error);
  }
};

const createInvention = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newInvention = await Invention.create(req.body);
    res.status(201).json(newInvention);
  } catch (error) {
    next(error);
  }
};

module.exports = { getInventions, createInvention };
