const Crypto = require("../models/cryptoModel.js");
const { calculateStandardDeviation } = require("../utils/math");
const mongoose = require("mongoose");

exports.getStats = async (req, res) => {
  try {
    const { coin } = req.query;
    console.log(coin);
    const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latestData) return res.status(404).json({ message: "Data not found" });
    
    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDeviation = async (req, res) => {
  try {
    const { coin } = req.query;
    const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);
    if (records.length === 0)
      return res.status(404).json({ message: "Insufficient data" });

    const prices = records.map(record => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
