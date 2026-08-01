const Store = require("../models/Store");
const TelcoTrend = require("../models/TelcoTrend");
const WalkInLog = require("../models/WalkInLog");

/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               category: { type: string }
 *               floor: { type: number }
 *               manager: { type: string }
 *     responses:
 *       201: { description: Store created }
 *       400: { description: Bad request }
 */
exports.createStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of stores }
 */
exports.getStores = async (req, res, next) => {
  try {
    const stores = req.user.role === "admin" ? await Store.find().populate("manager", "name email") : await Store.find({ manager: req.user._id }).populate("manager", "name email");
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /stores/recommendations:
 *   get:
 *     summary: Get product recommendations
 *     tags: [Stores]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Recommendations for stores }
 */
exports.getRecommendations = async (req, res, next) => {
  try {
    const stores = req.user.role === "admin" ? await Store.find() : await Store.find({ manager: req.user._id });

    const recommendations = [];
    for (const store of stores) {
      const trends = await TelcoTrend.find({ category: store.category }).sort({ recordedAt: -1 }).limit(5);

      const walkInLogs = await WalkInLog.find({ store: store._id }).sort({ timestamp: -1 }).limit(10);

      const avgWalkIns = walkInLogs.reduce((sum, log) => sum + log.estimatedCustomerCount, 0) / (walkInLogs.length || 1);
      const avgTrendScore = trends.reduce((sum, trend) => sum + trend.trendScore, 0) / (trends.length || 1);

      recommendations.push({
        store: store.name,
        category: store.category,
        recommendation: avgTrendScore > 60 && avgWalkIns > 10 ? `Promote trending ${store.category} products due to high demand` : `Monitor ${store.category} trends; consider targeted promotions`,
      });
    }

    res.json(recommendations);
  } catch (error) {
    next(error);
  }
};
