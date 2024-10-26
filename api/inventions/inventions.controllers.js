const Invention = require("../../models/Invention");
const User = require("../../models/User");
const getInventions = async (req, res, next) => {
  try {
    const inventions = await Invention.find().populate("inventors").populate("orders");
    res.status(200).json(inventions);
  } catch (error) {
    next(error);
  }
};

const getInvention = async (req, res, next) => {
  try {
    const invention = await Invention.findById(req.params.id).populate("inventors").populate("orders");
    res.status(200).json(invention);
  } catch (error) {
    next(error);
  }
};

const getInventionsByUser = async (req, res, next) => {
  try {
    const inventions = await Invention.find({ inventors: req.params.id });
    res.status(200).json(inventions);
  } catch (error) {
    next(error);
  }
};

const createInvention = async (req, res, next) => {
  try {
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }

    const inventors = req.body.inventors ? [req.user._id, ...req.body.inventors] : req.user._id
    // req.body.invertors will be taken from formdata in frontend (check images array for inventions in frontend as reference) 
    console.log(inventors)
    const newInvention = await Invention.create({...req.body, inventors});
    await User.findByIdAndUpdate(req.user._id, {
      $push: { inventions: newInvention._id },
    });
    res.status(201).json(newInvention);
  } catch (error) {
    next(error);
  }
};

const updateInvention = async (req, res, next) => {
  try {
    const updatedInvention = await Invention.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedInvention);

    const user = req.user;
    const invention = await Invention.findById(req.params.id);
    if (invention.inventors.includes(user._id) || user.role === "admin") {
      const updatedInvention = await Invention.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedInvention);
    } else {
      res
        .status(403)
        .json({ message: "You are not the inventor of this invention" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteInvention = async (req, res, next) => {
  try {
    const user = req.user;
    const invention = await Invention.findById(req.params.id);
    if (invention.inventors.includes(user._id) || user.role === "admin") {
      const deletedInvention = await Invention.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedInvention);
    } else {
      res
        .status(403)
        .json({ message: "You are not the inventor of this invention" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventions,
  getInvention,
  createInvention,
  updateInvention,
  deleteInvention,
  getInventionsByUser,
};
