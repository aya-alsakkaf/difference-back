const Order = require("../../models/Order");
const User = require("../../models/User");
const Invention = require("../../models/Invention");
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("investor", "-password")
      .populate("invention", "-description");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("invention")
      .populate("investor", "-password");
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    if (req.user.role === "admin" || req.user.role === "investor") {
      const order = await Order.create({
        ...req.body,
        investor: req.user._id,
        invention: req.params.inventionId,
      }); // percentage will be calculated in the frontend to only except Z numbers (no decimals)
      await User.findByIdAndUpdate(req.user._id, {
        $push: { investments: order._id },
      });
      await Invention.findByIdAndUpdate(req.params.inventionId, {
        $push: { orders: order._id },
      });
      res.status(201).json(order);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    const invention = await Invention.findById(order.invention);
    if (req.user._id.equals(order.investor) || req.user.role === "admin" || req.user._id.equals(invention.inventors[0])) {
      const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
      });
      res.status(200).json(updatedOrder);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.user._id.equals(order.investor) || req.user.role === "admin") {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedOrder);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
