const router = require("express").Router();
const { add } = require("../controllers/match.controller");
const middleware = require("../middleware/middleware");


router
    .route("/add")
    .post(middleware, add)

module.exports = router;