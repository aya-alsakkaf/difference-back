const categoryRouter = require("express").Router();
const {
  getCategories,
  createCategory,
  getOneCategory,
} = require("./categories.controllers");
const passport = require("passport");
categoryRouter.get("/", getCategories);
categoryRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
categoryRouter.get("/:id", getOneCategory);

module.exports = categoryRouter;
