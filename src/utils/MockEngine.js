export const analyzeDocument = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const score = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random score between 60 and 100
      const analysis = `
        Based on the analysis of ${file.name}, the document shows strong compliance in environmental factors.
        However, there are some gaps in governance structures.
        
        Key Findings:
        - Carbon Footprint: Low
        - Social Responsibility: High
        - Governance: Needs Improvement
        
        Recommended Action: Review board composition and transparency policies.
      `;
      resolve({ score, analysis });
    }, 2000); // Simulate 2s delay
  });
};
