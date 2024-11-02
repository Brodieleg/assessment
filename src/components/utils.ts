export const generateMarkdownSummary = (name: string, companyName: string, answers: number[], questions: any[]) => {
  const overallScore = answers.reduce((a, b) => a + b, 0) / answers.length;
  
  let markdown = `# Assessment Summary\n\n`;
  markdown += `## Personal Information\n`;
  markdown += `- **Name:** ${name}\n`;
  markdown += `- **Company:** ${companyName}\n\n`;
  markdown += `## Overall Score: ${overallScore.toFixed(2)}/10\n\n`;
  
  questions.forEach((category, categoryIndex) => {
    const categoryAnswers = answers.slice(categoryIndex * 5, (categoryIndex + 1) * 5);
    const averageScore = categoryAnswers.reduce((a, b) => a + b, 0) / categoryAnswers.length;
    
    markdown += `### ${category.category}\n`;
    markdown += `**Average Score:** ${averageScore.toFixed(2)}/10\n\n`;
    markdown += `#### Responses:\n`;
    category.questions.forEach((question: string, questionIndex: number) => {
      markdown += `- **Q:** ${question}\n`;
      markdown += `  **A:** ${categoryAnswers[questionIndex]}/10\n`;
    });
    markdown += '\n';
  });
  
  return markdown;
};