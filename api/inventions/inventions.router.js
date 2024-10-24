const inventionRouter = require("express").Router();
const {
  getInventions,
  getInvention,
  createInvention,
  updateInvention,
  deleteInvention,
  getInventionsByUser,
} = require("./inventions.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");
inventionRouter.get("/", getInventions);
inventionRouter.get("/:id", getInvention);
inventionRouter.post(
  "/",
  upload.array("images", 30),
  passport.authenticate("jwt", { session: false }),
  createInvention
);
inventionRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateInvention
);
inventionRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteInvention
);
inventionRouter.get("/user/:id", getInventionsByUser);

module.exports = inventionRouter;
