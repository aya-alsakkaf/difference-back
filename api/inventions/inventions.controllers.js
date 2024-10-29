const Category = require("../../models/Category");
const Invention = require("../../models/Invention");
const User = require("../../models/User");
const mongoose = require("mongoose");
const getInventions = async (req, res, next) => {
  try {
    const inventions = await Invention.find()
      .populate("inventors")
      .populate("orders");
    res.status(200).json(inventions);
  } catch (error) {
    next(error);
  }
};

const getInvention = async (req, res, next) => {
  try {
    console.log("first");
    const invention = await Invention.findById(req.params.id)
      .populate("inventors")
      .populate("orders");
    res.status(200).json(invention);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getInventionsByUser = async (req, res, next) => {
  try {
    const inventions = await Invention.find({ inventors: req.params.id })
      .populate("inventors")
      .populate("orders");
    res.status(200).json(inventions);
  } catch (error) {
    next(error);
  }
};
const getInventionById = async (req, res, next) => {
  try {
    const invention = await Invention.findById(req.params.id)
      .populate("inventors")
      .populate("orders");
    res.status(200).json(invention);
  } catch (error) {
    next(error);
  }
};

const createInvention = async (req, res, next) => {
  try {
    // req.body.inventors = JSON.parse(req.body.inventors);

    console.log("inventors", req.body.inventors.split(","));
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path);
    }
    const inventorIds = req.body.inventors.split(",").map((id) => {
      return new mongoose.Types.ObjectId(id.trim());
    });
    req.body.inventors = [req.user._id, ...inventorIds];
    const inventionData  = {
      ...req.body,
      inventors: [req.user._id, ...inventorIds],
    };
    console.log(inventionData);
    // req.body.invertors will be taken from formdata in frontend (check images array for inventions in frontend as reference)
    const newInvention = await Invention.create(inventionData);
    console.log(newInvention);
    await Category.findByIdAndUpdate(req.body.category, {
      $push: { inventions: newInvention._id },
    });
    [req.user._id, ...inventorIds].forEach(async (inventorId) => {
      await User.findByIdAndUpdate(inventorId, {
        $push: { inventions: newInvention._id },
      });
    });
    res.status(201).json(newInvention);
  } catch (error) {
    next(error);
  }
};

const updateInvention = async (req, res, next) => {
  try {
    const user = req.user;
    const invention = await Invention.findById(req.params.id);
    
    if (!invention) {
      return res.status(404).json({ message: "Invention not found" });
    }

    if (invention.inventors.includes(user._id) || user.role === "admin") {
      let updateData = { ...req.body };
      
      
      // Handle new images if uploaded
      if (req.files && req.files.length > 0) {
        updateData.images = await req.files.map(file => file.path.replace("\\", "/"));
      }
      
      // Handle inventors
      // if (req.body.inventors) {
      //   const inventorIds = req.body.inventors.split(",").map(id => 
      //     new mongoose.Types.ObjectId(id.trim())
      //   );
      //   updateData.inventors = [req.user._id, ...inventorIds];
      // }
      
      // Convert cost to number
      if (updateData.cost) {
        updateData.cost = Number(updateData.cost);
      }
      console.log(updateData)

      const updatedInvention = await Invention.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      return res.status(200).json(updatedInvention);
    } else {
      return res.status(403).json({ message: "You are not authorized to update this invention" });
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

const toggleLikeInvention = async (req, res, next) => {
  try {
    const invention = await Invention.findById(req.params.id);
    if (invention) {
      let message = "";
      const user = await User.findById(req.user._id);
      if (user) {
        const isLiked = invention.likes.includes(user._id);
        if (isLiked) {
          invention.likes = invention.likes.filter(
            (id) => !id.equals(user._id)
          );
          user.liked = user.liked.filter((id) => !id.equals(invention._id));
          message = "Invention unliked";
        } else {
          invention.likes.push(user._id);
          user.liked.push(invention._id);
          message = "Invention liked";
        }
        await invention.save();
        await user.save();
        return res.status(200).json({ message, invention });
      } else {
        return res
          .status(404)
          .json({ message: "User not found", invention: invention });
      }
    } else {
      return res.status(404).json({ message: "Invention not found" });
    }
  } catch (error) {
    next(error);
  }
};

const toggleInterestedInvention = async (req, res, next) => {
  try {
    if (req.user.role !== "investor" && req.user.role !== "admin")
      return res.status(403).json({ message: "For investors only" });
    const invention = await Invention.findById(req.params.id);
    if (invention) {
      let message = "";
      const user = await User.findById(req.user._id);
      if (user) {
        const isIntrested = invention.intrestedInvestors.includes(user._id);
        if (isIntrested) {
          invention.intrestedInvestors = invention.intrestedInvestors.filter(
            (id) => !id.equals(user._id)
          );
          user.intrests = user.intrests.filter(
            (id) => !id.equals(invention._id)
          );
          message = "Invention removed from interests";
        } else {
          invention.intrestedInvestors.push(user._id);
          user.intrests.push(invention._id);
          message = "Invention added to interests";
        }
        await invention.save();
        await user.save();
        return res.status(200).json({ message, invention });
      } else {
        return res
          .status(404)
          .json({ message: "User not found", invention: invention });
      }
    } else {
      return res.status(404).json({ message: "Invention not found" });
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
  toggleLikeInvention,
  toggleInterestedInvention,
  getInventionById,
};
