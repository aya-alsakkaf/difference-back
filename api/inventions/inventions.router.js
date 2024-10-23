const inventionRouter = require("express").Router();
const {
  getInventions,
  createInvention,
  updateInvention,
  deleteInvention,
} = require("./inventions.controllers");
const upload = require("../../middleware/multer");

inventionRouter.get("/", getInventions);
inventionRouter.post("/", upload.array("images", 30), createInvention);
inventionRouter.put("/:id", updateInvention);
