import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-full bg-red-900/20 text-red-300 border-2 border-dashed border-red-700/50 rounded-lg p-8">
      <div className="text-center">
        <h3 className="font-bold text-lg">Ối! Đã có lỗi xảy ra.</h3>
        <p className="mt-2 text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;