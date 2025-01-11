import keyword_extractor from 'keyword-extractor';

export const extractKeywords = (text: string): string[] => {
  if (!text) return [];
  
  // Using keyword extraction with better configuration
  const extracted = keyword_extractor.extract(text, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
    return_chained_words: true,
    remove_filters: ["a", "the", "and", "but", "for", "with", "to", "in", "on", "at"]
  });
  
  // Filter out very short words and common words
  const filteredKeywords = extracted
    .filter(word => word.length > 2)
    .filter(word => !['the', 'and', 'but', 'for', 'with', 'this', 'that', 'from', 'what', 'when', 'where', 'who'].includes(word.toLowerCase()))
    .slice(0, 8); // Return top 8 keywords
    
  return filteredKeywords;
};

export type Keyword = {
  id: string;
  text: string;
};