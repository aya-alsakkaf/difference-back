const router = require('express').Router();
const {register, login} = require("./users.controllers")
const upload = require("../../middleware/multer")
router.post("/auth/register", upload.single("image"), register)
router.post("/auth/login", login)


module.exports = router;