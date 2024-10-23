const Order = require("../../models/Order");
const User = require("../../models/User");
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("invention").populate("investor");
        res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
}
const getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("invention").populate("investor");
        res.status(200).json(order);
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body);
        await User.findByIdAndUpdate(req.user._id, { $push: { investments: order._id } });
        res.status(201).json(order);
    } catch (error) {
        next(error)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (req.user._id.equals(order.investor) || req.user.role === "admin") {
            const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { role: req.body.role });
            res.status(200).json(updatedOrder);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        next(error)
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (req.user._id.equals(order.investor) || req.user.role === "admin") {
            const deletedOrder = await Order.findByIdAndDelete(req.params.id);
            // await User.findByIdAndUpdate(req.user._id, { $pull: { investments: deletedOrder._id } });
            res.status(200).json(deletedOrder);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
}
