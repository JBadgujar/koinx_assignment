const axios = require("axios");
const Crypto = require("../models/cryptoModel.js");

const COINS = ["bitcoin", "matic-network", "ethereum"];

const options = {
    method : 'GET',
    url : "https://api.coingecko.com/api/v3/simple/price",
    params:{
        ids: "bitcoin,ethereum,matic-network",
        vs_currencies: "usd",
        include_market_cap: "true",
        include_24hr_change: "true",
        include_last_updated_at: "true",
    },
    headers:{
        accept: "application/json",
        "x-cg-demo-api-key": process.env.API_SECRET,
    }
};

const fetchCryptoData = async () => {
  try {
    const responses = await axios.request(options);
    const data = responses.data;
    
    const cryptoData = COINS.map((coin) => {
      return {
        coin: coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      };
    });

    await Crypto.insertMany(cryptoData);
    console.log("Crypto data updated successfully!");
  } catch (err) {
    console.error("Error fetching crypto data:", err.message);
  }
};

module.exports = fetchCryptoData;
