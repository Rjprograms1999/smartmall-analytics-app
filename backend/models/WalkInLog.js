const mongoose = require("mongoose");

const walkInLogSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", required: true },
  timestamp: { type: Date, default: Date.now },
  estimatedCustomerCount: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("WalkInLog", walkInLogSchema);
