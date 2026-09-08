import React from 'react';
import { DownloadIcon } from 'lucide-react';

const DownloadButton = ({ className = "" }) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <button 
      onClick={handleDownload} 
      className={`flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors ${className}`}
    >
      <DownloadIcon className="size-4" />
      Download PDF
    </button>
  );
};

export default DownloadButton;
