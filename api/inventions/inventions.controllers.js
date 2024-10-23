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
<<<<<<< HEAD
<<<<<<< HEAD
    req.files = JSON.parse(req.body.images);
    // console.log(req.body.images);
    if (req.files) {
      console.log(req.files);
=======
    if (req.files && req.files.length > 0) {
>>>>>>> origin/main
=======
    if (req.files && req.files.length > 0) {
>>>>>>> origin/main
      req.body.images = req.files.map((file) => file.path);
    }
    const newInvention = await Invention.create(req.body);
    res.status(201).json(newInvention);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateInvention = async (req, res, next) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const updatedInvention = await Invention.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedInvention);
=======
=======
>>>>>>> origin/main
    const user = req.user;
    const invention = await Invention.findById(req.params.id);
    if(invention.inventors.includes(user._id) || user.role === "admin"){
      const updatedInvention = await Invention.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json(updatedInvention);
    } else {
      res.status(403).json({ message: "You are not the inventor of this invention" });
    }
<<<<<<< HEAD
>>>>>>> origin/main
=======
>>>>>>> origin/main
  } catch (error) {
    next(error);
  }
};

const deleteInvention = async (req, res, next) => {
  try {
    const user = req.user;
    const invention = await Invention.findById(req.params.id);
    if(invention.inventors.includes(user._id) || user.role === "admin"){
      const deletedInvention = await Invention.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedInvention);
    } else {
      res.status(403).json({ message: "You are not the inventor of this invention" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventions,
  createInvention,
  updateInvention,
  deleteInvention,
};
