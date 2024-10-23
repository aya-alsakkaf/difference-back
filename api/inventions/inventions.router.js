const inventionRouter = require("express").Router();
const {
  getInventions,
  createInvention,
  updateInvention,
  deleteInvention,
} = require("./inventions.controllers");
const upload = require("../../middleware/multer");
<<<<<<< HEAD
inventionRouter.get("/inventions", getInventions);
inventionRouter.post(
  "/inventions",
  upload.array("images", 30),
  createInvention
);
inventionRouter.put("/inventions/:id", updateInvention);
inventionRouter.delete("/inventions/:id", deleteInvention);
=======
const passport = require("passport");
inventionRouter.get("/", getInventions);
inventionRouter.post("/", upload.array("images", 30), createInvention);
inventionRouter.put("/:id", passport.authenticate("jwt", { session: false }), updateInvention);
inventionRouter.delete("/:id", passport.authenticate("jwt", { session: false }), deleteInvention);
>>>>>>> origin/main

module.exports = inventionRouter;
