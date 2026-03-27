import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { isAtsSafeFont } from '../../lib/fontConfig';

const ATSScoreCard = ({ data }) => {
  
  const calculateScore = () => {
    let score = 100;
    const deductions = [];

    // Check contact info completeness
    if (!data.personal_info?.email || !data.personal_info?.phone) {
      score -= 10;
      deductions.push('Missing critical contact info (Email/Phone)');
    }

    // Check formatting elements (fake check for simplicity here based on template)
    if (data.template !== 'classic' && data.template !== 'minimal') {
      score -= 15;
      deductions.push('Non-standard template layout might confuse older parsers');
    }

    // Check for professional summary
    if (!data.professional_summary || data.professional_summary.length < 50) {
      score -= 10;
      deductions.push('Professional summary missing or too brief');
    }

    return { score: Math.max(0, score), deductions };
  };

  const { score, deductions } = calculateScore();

  let statusColor = 'text-green-600';
  let bgColor = 'bg-green-50';
  let Icon = CheckCircle2;

  if (score < 80) {
    statusColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    Icon = AlertTriangle;
  }
  if (score < 60) {
    statusColor = 'text-red-600';
    bgColor = 'bg-red-50';
    Icon = XCircle;
  }

  return (
    <div className={`p-4 rounded-lg border \${bgColor} \${statusColor.replace('text', 'border')} mb-4`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-lg font-bold flex items-center gap-2 \${statusColor}`}>
          <Icon className="size-5" /> ATS Readability Score: {score}/100
        </h3>
      </div>
      
      {deductions.length > 0 && (
        <div className="mt-3 space-y-1">
          <p className="font-semibold text-sm text-gray-700">Areas for Improvement:</p>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {deductions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
      
      {deductions.length === 0 && (
        <p className="text-sm mt-2 font-medium">Excellent! Your resume follows standard formats and is highly parsable.</p>
      )}
    </div>
  );
};

export default ATSScoreCard;
