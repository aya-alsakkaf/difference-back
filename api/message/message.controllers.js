const Message = require("../../models/Message");

const createMessage = async (req, res, next) => {
  try {
    const { sender, recipient, content } = req.body;
    const message = await Message.create({ sender, recipient, content });
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage };
