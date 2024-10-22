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
    if (req.files) {
      req.body.images = req.files.map((file) => file.path);
    }
    const newInvention = await Invention.create(req.body);
    res.status(201).json(newInvention);
  } catch (error) {
    next(error);
  }
};

const updateInvention = async (req, res, next) => {
  try {
    const updatedInvention = await Invention.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(updatedInvention);
  } catch (error) {
    next(error);
  }
};

const deleteInvention = async (req, res, next) => {
  try {
    const deletedInvention = await Invention.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedInvention);
  } catch (error) {
    next(error);
  }
};



module.exports = { getInventions, createInvention, updateInvention, deleteInvention };
