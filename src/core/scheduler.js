// Cron/scheduler for automation

const cron = require("node-cron");
const { fetchJobs } = require("../api/technoparkFetcher");

function startScheduler() {
  cron.schedule("0 * * * *", async () => {
    console.log("⏰ Running scheduled job...");
    const jobs = await fetchJobs(1);
    console.log("Fetched jobs:", jobs.data.length);
  });
}

module.exports = { startScheduler };
