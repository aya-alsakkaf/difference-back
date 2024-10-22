const inventionRouter = require("express").Router();
const { getInventions, createInvention } = require("./inventions.controllers");
const upload = require("../../middleware/multer");
inventionRouter.get("/inventions", getInventions);
inventionRouter.post("/inventions", upload.single("image"), createInvention);

module.exports = inventionRouter;
