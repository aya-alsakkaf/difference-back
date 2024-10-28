const passport = require("passport");
const router = require("express").Router();
const {
  getCategories,
  createCategory,
  getOneCategory,
} = require("./categories.controllers");
router.get("/", getCategories);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
router.get("/:id", getOneCategory);

module.exports = router;
