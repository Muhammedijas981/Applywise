// Fetch details for each job

const axios = require("axios");

// Fetch HTML job details by job ID
async function fetchJobDetails(jobId) {
  try {
    const res = await axios.get(
      `https://technopark.in/job-details/${jobId}`
    ); 
    return res.data; // HTML string
  } catch (err) {
    console.error(`❌ Error fetching job ${jobId}:`, err.message);
    return null;
  }
}

module.exports = { fetchJobDetails };

