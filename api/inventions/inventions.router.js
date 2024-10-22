const inventionRouter = require("express").Router();
const { getInventions, createInvention, updateInvention, deleteInvention } = require("./inventions.controllers");
const upload = require("../../middleware/multer");
inventionRouter.get("/inventions", getInventions);
inventionRouter.post("/inventions", upload.array("image", 30), createInvention);
inventionRouter.put("/inventions/:id", updateInvention);
inventionRouter.delete("/inventions/:id", deleteInvention);

module.exports = inventionRouter;
