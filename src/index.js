require("dotenv").config();
const connectDB = require("./db/connect");
const express = require("express");
const { runPipeline } = require("./core/pipeline");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  // run pipeline on startup
  runPipeline();
});

app.get("/", (req, res) => res.send("JobMatch AI backend running ✅"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
