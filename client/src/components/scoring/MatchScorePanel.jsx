import React, { useState, useEffect } from 'react';
import { calculateBM25Score } from '../../lib/bm25';
import { Target, CheckCircle2, XCircle } from 'lucide-react';

const MatchScorePanel = ({ data }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [matchData, setMatchData] = useState({ score: 0, matchedKeywords: [], missingKeywords: [] });

  // Extract all text from resume data into a single string for BM25 calculation
  const getResumeText = () => {
    let textChunks = [];
    if (data.professional_summary) textChunks.push(data.professional_summary);
    if (data.skills) textChunks.push(data.skills.join(' '));
    if (data.experience) {
      data.experience.forEach(exp => {
        textChunks.push(exp.position);
        textChunks.push(exp.company);
        if (exp.description) textChunks.push(exp.description);
      });
    }
    if (data.education) {
      data.education.forEach(edu => {
        textChunks.push(edu.degree);
        textChunks.push(edu.field);
        textChunks.push(edu.institution);
      });
    }
    return textChunks.join(' ');
  };

  useEffect(() => {
    if (jobDescription.length > 20) {
      const resumeText = getResumeText();
      const result = calculateBM25Score(resumeText, jobDescription);
      setMatchData(result);
    } else {
      setMatchData({ score: 0, matchedKeywords: [], missingKeywords: [] });
    }
  }, [data, jobDescription]);

  let scoreColor = 'text-green-600';
  let scoreBarColor = 'bg-green-500';
  if (matchData.score < 75) {
    scoreColor = 'text-yellow-600';
    scoreBarColor = 'bg-yellow-500';
  }
  if (matchData.score < 50) {
    scoreColor = 'text-red-600';
    scoreBarColor = 'bg-red-500';
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
      <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
        <Target className="size-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-gray-800">Job Match Score (BM25)</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Paste Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the target job description here to see how well your resume matches..."
            className="w-full h-40 p-3 text-sm border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none outline-none"
          />
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-medium text-gray-600">Match Score</span>
            <span className={`text-3xl font-bold \${scoreColor}`}>{Math.max(0, matchData.score)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className={`h-2.5 rounded-full \${scoreBarColor} transition-all duration-500`} style={{ width: `${Math.max(0, matchData.score)}%` }}></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                <CheckCircle2 className="size-3 text-green-500" /> Matched Keywords
              </p>
              <div className="flex flex-wrap gap-1">
                {matchData.matchedKeywords.length > 0 ? (
                  matchData.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs border border-green-200">{kw}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">None yet</span>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                <XCircle className="size-3 text-red-500" /> Missing Keywords
              </p>
              <div className="flex flex-wrap gap-1">
                {matchData.missingKeywords.length > 0 ? (
                  matchData.missingKeywords.map((kw, i) => (
                    <span key={i} className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs border border-red-200">{kw}</span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">None yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScorePanel;
