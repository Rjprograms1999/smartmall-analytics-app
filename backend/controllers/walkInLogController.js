const WalkInLog = require("../models/WalkInLog");

/**
 * @swagger
 * /walkinlogs:
 *   post:
 *     summary: Create a walk-in log
 *     tags: [WalkInLogs]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               store: { type: string }
 *               estimatedCustomerCount: { type: number }
 *     responses:
 *       201: { description: Walk-in log created }
 */
exports.createWalkInLog = async (req, res, next) => {
  try {
    const { store, estimatedCustomerCount } = req.body;
    if (req.user.role === "storeManager" && store !== req.user.store.toString()) {
      return res.status(403).json({ message: "Access denied to this store" });
    }
    const log = await WalkInLog.create({ store, estimatedCustomerCount });
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /walkinlogs:
 *   get:
 *     summary: Get walk-in logs
 *     tags: [WalkInLogs]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of walk-in logs }
 */
exports.getWalkInLogs = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { store: req.user.store };
    const logs = await WalkInLog.find(query).populate("store", "name category");
    res.json(logs);
  } catch (error) {
    next(error);
  }
};
