// Draft emails for matched jobs

function draftEmail(job, resume) {
  return {
    subject: `Application for ${job.title} at ${job.company}`,
    body: `Dear Hiring Manager,\n\nI am interested in the ${job.title} role at ${job.company}. Please find my resume attached.\n\nBest regards,\n[Your Name]`
  };
}

module.exports = draftEmail;
