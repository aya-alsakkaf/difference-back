const router = require("express").Router();
const {
  getInventions,
  getInvention,
  createInvention,
  updateInvention,
  deleteInvention,
  getInventionsByUser,
  toggleLikeInvention,
  toggleInterestedInvention,
  getInventionById,
  incrementViews,
} = require("./inventions.controllers");
const upload = require("../../middleware/multer");
const passport = require("passport");
router.get("/", getInventions);
router.get("/:id", getInvention);
router.get("/:id", getInventionById);
router.post(
  "/",
  // upload.array("images", 30),
  upload.fields([
    { name: "images", maxCount: 30 },
    { name: "documents", maxCount: 30 },
  ]),
  passport.authenticate("jwt", { session: false }),
  createInvention
);
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 30 },
    { name: "documents", maxCount: 30 },
  ]),
  // upload.array("documents", 30),
  passport.authenticate("jwt", { session: false }),
  updateInvention
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteInvention
);
router.get("/user/:id", getInventionsByUser); // hassan do this make it /:userId only

router.put(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  toggleLikeInvention
);
router.put(
  "/:id/interested",
  passport.authenticate("jwt", { session: false }),
  toggleInterestedInvention
);
router.put("/:id/views", incrementViews);
module.exports = router;
