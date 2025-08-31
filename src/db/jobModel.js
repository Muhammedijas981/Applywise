// Job schema (id, title, company, match_score, etc.)

const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  source: { type: String, required: true },
  job_id: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  skills: [String],
  posted_date: String,
  closing_date: String,
  match_score: { type: Number, default: 0 },
  status: { type: String, default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
