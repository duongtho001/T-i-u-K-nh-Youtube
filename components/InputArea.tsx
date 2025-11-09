import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onOptimize: () => void;
  isLoading: boolean;
  hasApiKeys: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ value, onChange, onOptimize, isLoading, hasApiKeys }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3 text-gray-300">Nội dung thô của bạn</h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Dán bản ghi video, ghi chú hoặc mô tả cũ của bạn vào đây..."
        className="flex-grow w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow duration-300 resize-none min-h-[400px] lg:min-h-0"
        disabled={isLoading}
      />
      <button
        onClick={onOptimize}
        disabled={isLoading || !value.trim() || !hasApiKeys}
        className="w-full mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
        title={!hasApiKeys ? "Vui lòng thiết lập API key trong Cài đặt" : ""}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tối ưu...
          </>
        ) : (
          'Tối ưu Nội dung'
        )}
      </button>
    </div>
  );
};

export default InputArea;