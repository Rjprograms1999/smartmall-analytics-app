const express = require("express");
const { register, login } = require("../controllers/authController");
const { adminMiddleware, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authMiddleware, adminMiddleware, register);
router.post("/login", login);

module.exports = router;
