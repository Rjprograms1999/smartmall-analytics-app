const express = require("express");
const { createStore, getStores, getRecommendations } = require("../controllers/storeController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createStore);
router.get("/", authMiddleware, getStores);
router.get("/recommendations", authMiddleware, getRecommendations);

module.exports = router;
