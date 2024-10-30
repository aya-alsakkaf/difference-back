const router = require("express").Router();
const {
  register,
  login,
  getUsers,
  getUser,
  getInventors,
  getProfile,
  updateProfile,
  getProfileById,
} = require("./user.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.get("/users/:id", getProfileById);
router.get("/inventors", getInventors);
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
router.post("/auth/login", login);

module.exports = router;
