require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const cryptoRoutes = require("./routes/cryptoRoutes.js");
const fetchCryptoData = require("./jobs/fetchCryptoData.js");
connectDB();

const app = express();
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get("/fetch", async (req, res) => {
  await fetchCryptoData();
  res.json({ message: "Crypto data updated successfully!" });
});
app.use("/api", cryptoRoutes);

setInterval(fetchCryptoData, 2*60*1000);

app.listen(5000, () => {
    console.log('Server running on port 5000')
})

module.exports = app;
