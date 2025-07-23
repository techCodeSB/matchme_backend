const router = require('express').Router();
const userRoute = require("./user.route");
const preferanceRoute = require("./preferance.route");



router.use("/users", userRoute);
router.use("/preferance", preferanceRoute);


module.exports = router;
