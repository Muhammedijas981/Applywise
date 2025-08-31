const { fetchJobDetails } = require("../src/api/jobDetailsFetcher");

(async () => {
  const html = await fetchJobDetails(23149); // example job ID
  console.log("Fetched HTML:", html);
  console.log("HTML length:", html?.length || 0);
})();
