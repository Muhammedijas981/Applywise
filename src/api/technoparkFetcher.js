// Fetch jobs from technopark API

const axios = require("axios");

async function fetchJobsList(page = 1) {
  try {
    const res = await axios.get(
      `https://technopark.in/api/paginated-jobs?page=${page}`
    );
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data; // <-- only the jobs array
    } else {
      console.warn("⚠️ Unexpected API response:", res.data);
      return [];
    }
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    return [];
  }
}

module.exports = { fetchJobsList };


