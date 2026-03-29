import { describe, it, expect } from 'vitest';
import { calculateBM25Score } from './bm25';

describe('BM25 Algorithm Score Calculation', () => {
    
    it('should return 0 when inputs are empty', () => {
        const result = calculateBM25Score('', '');
        expect(result.score).toBe(0);
        expect(result.matchedKeywords).toHaveLength(0);
        expect(result.missingKeywords).toHaveLength(0);
    });

    it('should score 0 when there are no matches', () => {
        const resume = "Experienced software engineer with python and java";
        const jd = "Looking for a nurse with hospital experience";
        const result = calculateBM25Score(resume, jd);
        
        expect(result.score).toBe(0);
        expect(result.matchedKeywords).toHaveLength(0);
        expect(result.missingKeywords).toContain('nurse');
    });

    it('should score high for exact matches', () => {
        const resume = "Experienced react developer proficient in javascript and node";
        const jd = "React developer javascript node";
        const result = calculateBM25Score(resume, jd);
        
        // Should comfortably be over 90%
        expect(result.score).toBeGreaterThan(90);
        expect(result.matchedKeywords).toContain('react');
        expect(result.matchedKeywords).toContain('javascript');
    });

    it('should calculate term frequency weightings correctly', () => {
        const resumeLowFreq = "I know some react.";
        const resumeHighFreq = "React developer. Wrote react apps. Taught react JS.";
        const jd = "react";
        
        const scoreLow = calculateBM25Score(resumeLowFreq, jd).score;
        const scoreHigh = calculateBM25Score(resumeHighFreq, jd).score;
        
        // High frequency of 'react' should increase score slightly (diminishing returns in BM25)
        expect(scoreHigh).toBeGreaterThanOrEqual(scoreLow);
    });
});
