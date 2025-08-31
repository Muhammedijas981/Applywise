// API keys, Mongo URI, Resume path

require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI ,
  googleApiKey: process.env.GOOGLE_API_KEY || "",
};
