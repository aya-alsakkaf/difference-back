const User = require("../../models/User");
const Investment = require("../../models/Order");
const Invention = require("../../models/Invention");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "31d" });
};
const register = async (req, res, next) => {
  try {
    if (req.file) {
      console.log(req.file);
      req.body.image = await req.file.path.replace("\\", "/");
    }
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    const user = await User.create(req.body);
    const token = createToken(user);
    res.status(201).json({
      token,
      message: "Account created successfully!",
      _id: user._id,
      role: user.role,
      firstName: user.firstName,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  console.log("dada");
  try {
    console.log(req.user);
    const token = createToken(req.user);
    res.status(200).json({
      token,
      message: "Logged in successfully!",
      _id: req.user._id,
      role: req.user.role,
      firstName: req.user.firstName,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getInventors = async (req, res, next) => {
  try {
    const inventors = await User.find({ role: "inventor" })
      .select("-password")
      .populate("inventions");

    if (!inventors.length) {
      return res.status(200).json({ message: "No inventors found", data: [] });
    }

    res.status(200).json(inventors);
  } catch (error) {
    console.error("Error fetching inventors:", error);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .select("-password")
      .populate("inventions")
      .populate("investments");

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getProfileById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("inventions");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = req.file.path;
    // }
    if (req.files) {
      if (req.files.image && req.files.image.length > 0) {
        req.body.image = await req.files.image[0].path.replace("\\", "/");
      }
      if (req.files.cv && req.files.cv.length > 0) {
        req.body.cv = await req.files.cv[0].path.replace("\\", "/");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  getInventors,
  getProfile,
  updateProfile,
  getProfileById,
};
