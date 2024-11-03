const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  createMessageRoom,
  getAllMessageRooms,
  getMessageRoomById,
} = require("./messageRoom.controller");

// create mesage room
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createMessageRoom
);

// get all message rooms
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllMessageRooms
);

// get message room
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getMessageRoomById
);

module.exports = router;
