const express = require("express");
const { createWalkInLog, getWalkInLogs } = require("../controllers/walkInLogController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createWalkInLog);
router.get("/", authMiddleware, getWalkInLogs);

module.exports = router;
