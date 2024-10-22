const router = require("express").Router();
const {
  register,
  login,
  getUsers,
  getUser,
  getProfile,
} = require("./user.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
router.post("/auth/register", upload.single("image"), register);
router.post("/auth/login", login);

module.exports = router;
