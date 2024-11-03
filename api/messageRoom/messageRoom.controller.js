const MessageRoom = require("../../models/MessageRoom");
const Message = require("../../models/Message");

const getAllMessageRooms = async (req, res, next) => {
  try {
    const messageRooms = await MessageRoom.find({
      participants: { $in: [req.user._id] },
    })
      .populate({
        path: "participants",
        match: { _id: { $ne: req.user._id } },
      })
      .populate({
        path: "messages",
      });
    res.status(200).json(messageRooms);
  } catch (error) {
    next(error);
  }
};

const getMessageRoomById = async (req, res, next) => {
  try {
    const messageRoom = await MessageRoom.findById(req.params.id)
      .populate({
        path: "participants",
        match: { _id: { $ne: req.user._id } },
      })
      .populate({ path: "messages" });

    if (!messageRoom) {
      return res.status(404).json({ message: "Message room not found" });
    }
    res.status(200).json(messageRoom);
  } catch (error) {
    next(error);
  }
};

const createMessageRoom = async (req, res, next) => {
  try {
    const { recipient, content } = req.body;
    const sender = req.user._id;

    const findMessageRoom = await MessageRoom.findOne({
      participants: { $all: [sender, recipient] },
    });
    if (findMessageRoom) {
      const message = await Message.create({
        sender,
        recipient,
        content,
      });
      findMessageRoom.messages.push(message._id);
      await findMessageRoom.save();
      return res.status(201).json(findMessageRoom);
    }

    const messageRoom = await MessageRoom.create({
      participants: [sender, recipient],
    });
    const message = await Message.create({
      sender,
      recipient,
      content,
    });
    messageRoom.messages.push(message._id);
    await messageRoom.save();
    res.status(201).json(messageRoom);
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessageRoom, getAllMessageRooms, getMessageRoomById };
