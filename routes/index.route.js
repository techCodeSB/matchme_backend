const router = require('express').Router();
const userRoute = require("./user.route");
const preferanceRoute = require("./preferance.route");
const psychometricRoute = require("./psychometric.route");
const matchRoute = require("./match.route");



router.use("/users", userRoute);
router.use("/preferance", preferanceRoute);
router.use("/psychometric", psychometricRoute);
router.use("/match", matchRoute);


module.exports = router;
