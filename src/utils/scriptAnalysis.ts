import { keywordExtractor } from 'keyword-extractor';

export const extractKeywords = (text: string): string[] => {
  // Using a more sophisticated keyword extraction
  const extracted = keywordExtractor.extract(text, {
    language: "english",
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true
  });
  
  // Filter out common words and keep only relevant keywords
  return extracted
    .filter(word => word.length > 2)
    .filter(word => !['the', 'and', 'but', 'for', 'with'].includes(word))
    .slice(0, 8); // Return top 8 keywords
};

export type Keyword = {
  id: string;
  text: string;
};
