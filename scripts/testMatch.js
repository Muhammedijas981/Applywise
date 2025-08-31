require("dotenv").config();
const connectDB = require("../src/db/connect");
const Job = require("../src/db/jobModel");

async function run() {
  await connectDB();

  try {
    // 1️⃣ Insert a dummy job
    const job = await Job.create({
      source: "technopark",
      job_id: "12345",
      title: "Backend Developer",
      company: "Test Company",
      skills: ["Node.js", "MongoDB", "Express"],
      match_score: 85,
    });
    console.log("✅ Job inserted:", job);

    // 2️⃣ Fetch jobs from DB
    const jobs = await Job.find();
    console.log("📄 Jobs in DB:", jobs);
  } catch (err) {
    console.error("❌ Error while testing DB:", err.message);
  } finally {
    process.exit(0); // close process after test
  }
}

run();
