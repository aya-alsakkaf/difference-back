const router = require("express").Router();
const {
  register,
  login,
  getUsers,
  getUser,
  getProfile,
  updateProfile,
} = require("./user.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get(
  "/auth/profile",
  passport.authenticate("jwt", { session: false }),
  getProfile
);
router.post("/auth/register", upload.single("image"), register);
router.put(
  "/auth/profile",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  updateProfile
);
router.post("/auth/login", passport.authenticate("local", {session: false}), login);

module.exports = router;
