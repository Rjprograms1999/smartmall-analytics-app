const express = require("express");
const { createTelcoTrend, getTelcoTrends } = require("../controllers/telcoTrendController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createTelcoTrend);
router.get("/", authMiddleware, getTelcoTrends);

module.exports = router;
