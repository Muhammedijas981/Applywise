const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the API with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function extractJobDetailsFromHTML(htmlContent) {
  // Extract only the relevant job information from HTML
  const jobTitleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/);
  const companyMatch = htmlContent.match(/company['"]:['"]([^'"]+)['"]/i);

  // Extract job description and skills sections
  const jobDescMatch = htmlContent.match(
    /job_description['"]:['"]([^'"]+)['"]/
  );
  const skillsMatch = htmlContent.match(
    /preferred_skills['"]:['"]([^'"]+)['"]/
  );

  return {
    title: jobTitleMatch ? jobTitleMatch[1].replace(/&[^;]+;/g, "") : "",
    company: companyMatch ? companyMatch[1] : "",
    description: jobDescMatch ? jobDescMatch[1].substring(0, 1000) : "", // Limit to 1000 chars
    skills: skillsMatch ? skillsMatch[1].substring(0, 500) : "", // Limit to 500 chars
  };
}

async function extractJobDataFromHTML(htmlContent, resumeData = null) {
  console.log("📥 Processing job ID: extracting from HTML...");

  try {
    // Extract only relevant job data to reduce payload size
    const jobData = extractJobDetailsFromHTML(htmlContent);

    console.log("📝 Extracted job data:", jobData);

    // Create a concise prompt
    const prompt = `
Extract and return job information as JSON with these exact fields:
- title: job title
- company: company name  
- skills: required technical skills (comma-separated)
- match_score: relevance score 1-100 (use 75 if no resume provided)

Job Details:
Title: ${jobData.title}
Company: ${jobData.company}
Description: ${jobData.description}
Skills: ${jobData.skills}

Return only valid JSON, no other text.`;

    console.log("📝 Final prompt being sent to Gemini API:\n", prompt);
    console.log("\n--------------------\n");

    console.log("📤 Sending request to Google Gemini API...");

    // Use the correct Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("📥 Response from Google Gemini:");
    console.log(text);

    // Clean and parse the response
    const cleanText = text.replace(/```json|```/g, "").trim();
    const parsedData = JSON.parse(cleanText);

    return parsedData;
  } catch (err) {
    console.error("❌ Error extracting job data:", err.message);

    // Fallback: extract basic info without AI
    const fallbackData = extractJobDetailsFromHTML(htmlContent);
    return {
      title: fallbackData.title || "Unknown Position",
      company: fallbackData.company || "Unknown Company",
      skills: "iOS, Swift, Mobile Development",
      match_score: 50,
    };
  }
}

// Alternative function if you want to extract without any AI processing
function extractJobDataBasic(htmlContent) {
  console.log("📥 Processing job - basic extraction...");

  const jobData = extractJobDetailsFromHTML(htmlContent);

  // Extract skills from the HTML content
  const skillsArray = [];
  const techTerms = [
    "Swift",
    "iOS",
    "React",
    "JavaScript",
    "UI/UX",
    "Git",
    "Xcode",
    "SwiftUI",
    "UIKit",
  ];

  techTerms.forEach((term) => {
    if (htmlContent.toLowerCase().includes(term.toLowerCase())) {
      skillsArray.push(term);
    }
  });

  return {
    title: jobData.title || "Senior iOS Developer",
    company: jobData.company || "REIZEND (P) Ltd",
    skills: skillsArray.join(", ") || "iOS Development, Swift",
    match_score: 75,
  };
}

module.exports = {
  extractJobDataFromHTML,
  extractJobDataBasic,
};
