const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/weatherController");

router.get("/", ctrl.getWeather);

module.exports = router;
