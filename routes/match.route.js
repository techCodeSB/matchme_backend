const router = require("express").Router();
const { add, get } = require("../controllers/match.controller");
const middleware = require("../middleware/middleware");


router
    .route("/add")
    .post(middleware, add)


router
    .route("/get")
    .post(middleware, get);

module.exports = router;