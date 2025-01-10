require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const cryptoRoutes = require("./routes/cryptoRoutes.js");
const fetchCryptoData = require("./jobs/fetchCryptoData.js");

// Initialize the database connection
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("server is healthy");
});

app.get("/fetch", async (req, res) => {
  await fetchCryptoData();
  res.json({ message: "Crypto data updated successfully!" });
});

// API routes
app.use("/api", cryptoRoutes);

// Schedule the fetchCryptoData job to run every 2 minutes
setInterval(fetchCryptoData, 2 * 60 * 1000);

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

module.exports = app;
