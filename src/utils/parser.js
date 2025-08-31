// HTML parsing helpers (if needed)

const cheerio = require("cheerio");

function parseJobDetails(html) {
  const $ = cheerio.load(html);
  // Example parsing
  return {
    title: $("h1").text(),
    description: $(".job-description").text()
  };
}

module.exports = { parseJobDetails };
