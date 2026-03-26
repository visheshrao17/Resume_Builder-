import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { DownloadIcon, Loader2 } from 'lucide-react';
import PDFDocument from './PDFDocument';
import toast from 'react-hot-toast';

const DownloadButton = ({ data, className = "" }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  // Use the usePDF hook or manual generation so we don't freeze the UI or generate on every stroke
  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // 1. Generate the PDF Blob
      const blob = await pdf(<PDFDocument data={data} />).toBlob();
      
      // 2. Create a temporary object URL
      const url = URL.createObjectURL(blob);
      
      // 3. Create a hidden element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      const safeName = (data?.personal_info?.full_name || 'Resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeName}_resume.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      // 4. Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Resume downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleDownload} 
      disabled={isGenerating}
      className={`flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isGenerating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <DownloadIcon className="size-4" />
      )}
      {isGenerating ? 'Generating...' : 'Download PDF'}
    </button>
  );
};

export default DownloadButton;
