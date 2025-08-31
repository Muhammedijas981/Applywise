const { fetchJobsList } = require("../api/technoparkFetcher");
const { fetchJobDetails } = require("../api/jobDetailsFetcher");
const { extractJobDataFromHTML } = require("../api/googleExtractor");
const Job = require("../db/jobModel");

async function runPipeline() {
  console.log("🚀 Starting job pipeline...");

  const jobsList = await fetchJobsList();
  if (!Array.isArray(jobsList) || jobsList.length === 0) {
    console.log("⚠️ No jobs fetched.");
    return;
  }

  for (const job of jobsList) {
    const jobId = job.id || job.job_id; // adapt to API response
    console.log(`📥 Processing job ID: ${jobId}`);

    // 1. Fetch job details HTML
    const html = await fetchJobDetails(jobId);
    if (!html) continue;

    // 2. Extract structured JSON from Gemini
    const extracted = await extractJobDataFromHTML(html);
    if (!extracted) continue;

    // 3. Save to MongoDB
    try {
      await Job.create({
        source: "technopark",
        job_id: jobId,
        title: extracted.title || "Unknown",
        company: extracted.company || "Unknown",
        skills: extracted.skills || [],
        match_score: null,
      });
      console.log(`✅ Job ${jobId} saved to DB`);
    } catch (err) {
      console.error(`❌ Error saving job ${jobId}:`, err.message);
    }
  }

  console.log("🏁 Pipeline completed");
}

module.exports = { runPipeline };
