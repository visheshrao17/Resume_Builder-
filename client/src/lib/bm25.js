/**
 * Calculate BM25 Match Score between a Resume and Job Description.
 * BM25 is an advanced TF-IDF weighting scheme used in modern search engines.
 * Formula: SCORE(D, Q) = sum( IDF(qi) * ((f(qi, D) * (k1 + 1)) / (f(qi, D) + k1 * (1 - b + b * (|D| / avgdl)))) )
 */

// Simple tokenizer to extract words, removing punctuation and lowercasing
const tokenize = (text) => {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 2); // filter out short stop words roughly
};

// Calculate term frequencies in a document
const getTermFrequencies = (tokens) => {
  const tfs = {};
  tokens.forEach((token) => {
    tfs[token] = (tfs[token] || 0) + 1;
  });
  return tfs;
};

export const calculateBM25Score = (resumeText, jobDescription) => {
  if (!resumeText || !jobDescription) return { score: 0, matchedKeywords: [], missingKeywords: [] };

  const resumeTokens = tokenize(resumeText);
  const jdTokens = tokenize(jobDescription);

  if (jdTokens.length === 0) return { score: 0, matchedKeywords: [], missingKeywords: [] };

  const resumeTFs = getTermFrequencies(resumeTokens);
  const jdTFs = getTermFrequencies(jdTokens);

  // We only have one document (the resume) being scored against the query (the JD).
  // In a real search engine with millions of documents, IDF is calculated across the corpus.
  // Here, we simulate IDF by weighting words in the JD based on their frequency in the JD itself.
  // Less frequent words in JD are considered "more specific/important".
  const k1 = 1.5;
  const b = 0.75;
  const docLength = resumeTokens.length;
  // Assume average document length is roughly the length of the JD
  const avgdl = jdTokens.length > 0 ? jdTokens.length : 1; 

  let score = 0;
  const uniqueJdTokens = Object.keys(jdTFs);
  const matchedKeywords = [];
  const missingKeywords = [];

  uniqueJdTokens.forEach((term) => {
    // Simulated IDF (Inverse Document Frequency)
    // The rarer the term in the query, the higher its IDF weight
    const idf = Math.log(1 + (jdTokens.length - jdTFs[term] + 0.5) / (jdTFs[term] + 0.5));
    
    const f = resumeTFs[term] || 0;
    
    if (f > 0) {
      matchedKeywords.push(term);
      const numerator = f * (k1 + 1);
      const denominator = f + k1 * (1 - b + b * (docLength / avgdl));
      score += idf * (numerator / denominator);
    } else {
      missingKeywords.push(term);
    }
  });

  // Normalize score to a 0-100 scale (approximation for UI purposes)
  // Max possible score if ALL terms matched perfectly 
  let maxPossibleScore = 0;
  uniqueJdTokens.forEach((term) => {
    const idf = Math.log(1 + (jdTokens.length - jdTFs[term] + 0.5) / (jdTFs[term] + 0.5));
    const idealF = jdTFs[term]; 
    const numerator = idealF * (k1 + 1);
    const denominator = idealF + k1 * (1 - b + b * (avgdl / avgdl));
    maxPossibleScore += idf * (numerator / denominator);
  });

  const normalizedScore = maxPossibleScore > 0 ? Math.min(100, Math.round((score / maxPossibleScore) * 100)) : 0;

  return {
    score: normalizedScore,
    matchedKeywords: matchedKeywords.slice(0, 15), // top 15 for UI
    missingKeywords: missingKeywords.slice(0, 15),
  };
};
