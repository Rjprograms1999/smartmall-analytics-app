const TelcoTrend = require("../models/TelcoTrend");

/**
 * @swagger
 * /telcotrends:
 *   post:
 *     summary: Create a telco trend
 *     tags: [TelcoTrends]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category: { type: string }
 *               trendScore: { type: number }
 *     responses:
 *       201: { description: Telco trend created }
 */
exports.createTelcoTrend = async (req, res, next) => {
  try {
    const trend = await TelcoTrend.create(req.body);
    res.status(201).json(trend);
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /telcotrends:
 *   get:
 *     summary: Get telco trends
 *     tags: [TelcoTrends]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: List of telco trends }
 */
exports.getTelcoTrends = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { category: (await Store.findById(req.user.store)).category };
    const trends = await TelcoTrend.find(query);
    res.json(trends);
  } catch (error) {
    next(error);
  }
};
