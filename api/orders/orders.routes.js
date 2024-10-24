const router = require("express").Router();
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder } = require("./orders.controllers");
const passport = require("passport");
router.get("/", getOrders);
router.post("/:inventionId", passport.authenticate("jwt", { session: false }), createOrder);
router.get("/:id", getOrder);
router.put("/:id", passport.authenticate("jwt", { session: false }), updateOrder);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteOrder);

module.exports = router;