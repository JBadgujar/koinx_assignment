const express = require("express");
const { getStats, getDeviation } = require("../controllers/cryptoController.js");

const router = express.Router();

router.get("/stats", getStats);
router.get("/deviation", getDeviation);

module.exports = router;
