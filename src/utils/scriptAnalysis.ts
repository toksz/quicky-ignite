export const extractKeywords = (text: string): string[] => {
  // Simple keyword extraction (can be enhanced with NLP libraries)
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['this', 'that', 'with', 'from', 'have'].includes(word));
  
  // Remove duplicates and return top 5 keywords
  return Array.from(new Set(words)).slice(0, 5);
};