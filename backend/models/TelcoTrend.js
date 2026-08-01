const mongoose = require("mongoose");

const telcoTrendSchema = new mongoose.Schema({
  category: { type: String, required: true },
  trendScore: { type: Number, required: true, min: 0, max: 100 },
  recordedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TelcoTrend", telcoTrendSchema);
