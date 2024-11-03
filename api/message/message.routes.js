const express = require("express");
const router = express.Router();
const { createMessage } = require("./message.controllers");
router.post("/", createMessage);

module.exports = router;
