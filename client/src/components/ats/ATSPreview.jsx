import React from 'react';
import ATSScoreCard from './ATSScoreCard';
import { Bot, TerminalSquare } from 'lucide-react';

const ATSPreview = ({ data }) => {
  // Simulates what an ATS bot sees when extracting raw text.
  // Standard parsers strip all formatting and just see raw text chunks.

  const renderSimulatedParsing = () => {
    let output = [];

    // Personal Info Component
    const info = data.personal_info || {};
    if (info.full_name) output.push(`NAME: ${info.full_name.toUpperCase()}`);
    if (info.email) output.push(`EMAIL: ${info.email}`);
    if (info.phone) output.push(`PHONE: ${info.phone}`);
    if (info.linkedin) output.push(`LINKEDIN: ${info.linkedin}`);

    // Summary
    if (data.professional_summary) {
      output.push(`\nSUMMARY:`);
      output.push(data.professional_summary);
    }

    // Experience
    if (data.experience && data.experience.length > 0) {
      output.push(`\nWORK EXPERIENCE:`);
      data.experience.forEach(exp => {
        output.push(`JOB TITLE: ${exp.position} | COMPANY: ${exp.company}`);
        output.push(`DATES: ${exp.start_date} TO ${exp.is_current ? 'PRESENT' : exp.end_date}`);
        if (exp.description) output.push(exp.description);
      });
    }

    // Education
    if (data.education && data.education.length > 0) {
      output.push(`\nEDUCATION:`);
      data.education.forEach(edu => {
        output.push(`DEGREE: ${edu.degree} IN ${edu.field} | INST: ${edu.institution}`);
        if (edu.gpa) output.push(`GPA: ${edu.gpa}`);
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      output.push(`\nSKILLS:`);
      output.push(data.skills.join(', '));
    }

    return output.join('\n');
  };

  return (
    <div className="w-full h-full bg-slate-900 text-green-400 p-6 rounded-lg font-mono overflow-auto text-sm print:hidden">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-700 pb-4 text-slate-300">
        <Bot className="size-5" />
        <h2 className="text-lg font-semibold">ATS Parser Simulation</h2>
      </div>
      
      <div className="mb-6 bg-slate-800 p-4 rounded text-slate-300">
        <ATSScoreCard data={data} />
      </div>

      <div className="flex items-center gap-2 text-slate-500 mb-2 mt-4 text-xs">
        <TerminalSquare className="size-4" /> Raw text extraction preview
      </div>

      <pre className="whitespace-pre-wrap break-words border-l-2 border-green-700 pl-4 py-2 opacity-90 leading-relaxed">
        {renderSimulatedParsing()}
      </pre>
    </div>
  );
};

export default ATSPreview;
