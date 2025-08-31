// If you expose APIs for frontend

// Define Express routes here if needed
const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
