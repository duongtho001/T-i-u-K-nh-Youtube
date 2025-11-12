import React, { useState, useCallback } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CopyableListItemProps {
  text: string;
}

const CopyableListItem: React.FC<CopyableListItemProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [text]);

  return (
    <li className="group flex items-center justify-between gap-4">
      <span className="flex-1">{text}</span>
      <button
        onClick={handleCopy}
        className="p-1.5 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-gray-600 hover:text-white transition-all duration-200"
        aria-label="Sao chép mục này"
        title="Sao chép mục này"
      >
        {isCopied ? (
          <CheckIcon className="w-4 h-4 text-green-400" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </button>
    </li>
  );
};

export default CopyableListItem;