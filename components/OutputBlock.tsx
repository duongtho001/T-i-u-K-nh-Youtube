import React, { useState, useRef, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface OutputBlockProps {
  title: string;
  children: React.ReactNode;
  isList?: boolean;
}

const OutputBlock: React.FC<OutputBlockProps> = ({ title, children, isList = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(() => {
    if (contentRef.current) {
      const textToCopy = contentRef.current.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  }, []);

  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-lg shadow-md">
      <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-t-lg">
        <h3 className="font-semibold text-gray-200">{title}</h3>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white transition-colors"
          aria-label={`Sao chép ${title}`}
        >
          {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
      <div className="p-4 text-gray-300">
        <div ref={contentRef}>
          {isList ? <ul className="list-disc list-inside space-y-2">{children}</ul> : children}
        </div>
      </div>
    </div>
  );
};

export default OutputBlock;