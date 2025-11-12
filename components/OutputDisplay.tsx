import React from 'react';
import { OptimizedContent } from '../types';
import OutputBlock from './OutputBlock';
import { RefreshIcon, SaveIcon, CheckIcon } from './Icons';
import CopyableListItem from './CopyableListItem';

interface OutputDisplayProps {
  content: OptimizedContent;
  onRegenerate: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content, onRegenerate, onSaveToHistory, isSaved }) => {
  const { titles, shortsTitles, description, tags, hashtags, chapters, cta } = content;

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-300">Kết quả Tối ưu</h2>
        <div className="flex items-center space-x-2">
          <button 
              onClick={onSaveToHistory}
              disabled={isSaved}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:text-green-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              aria-label="Lưu lịch sử"
              title={isSaved ? "Đã lưu vào lịch sử" : "Lưu vào lịch sử"}
          >
              {isSaved ? <CheckIcon className="w-5 h-5" /> : <SaveIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      <button 
        onClick={onRegenerate}
        className="w-full px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
        aria-label="Tạo mới kết quả"
        title="Tạo mới kết quả với cùng nội dung và cài đặt"
      >
        <RefreshIcon className="w-5 h-5 mr-2" />
        Tạo mới
      </button>

      <OutputBlock title="Tiêu đề đề xuất (Video dài)" isList>
        {titles.map((title, index) => (
          <CopyableListItem key={`long-${index}`} text={title} />
        ))}
      </OutputBlock>

      {shortsTitles && shortsTitles.length > 0 && (
        <OutputBlock title="Tiêu đề đề xuất (Shorts)" isList>
          {shortsTitles.map((title, index) => (
            <CopyableListItem key={`short-${index}`} text={title} />
          ))}
        </OutputBlock>
      )}

      <OutputBlock title="Mô tả đề xuất">
        <p className="whitespace-pre-wrap">{description}</p>
      </OutputBlock>

      {chapters && chapters.length > 0 && (
        <OutputBlock title="Chương (Chapters)">
          <div className="whitespace-pre-wrap">
            {chapters.map(ch => `${ch.timestamp} - ${ch.title}`).join('\n')}
          </div>
        </OutputBlock>
      )}

      <OutputBlock title="Hashtag">
        <p>{hashtags.map(h => `#${h}`).join(' ')}</p>
      </OutputBlock>
      
      <OutputBlock title="Thẻ (Tags - sao chép một dòng)">
        <p className="text-sm text-gray-400">{tags}</p>
      </OutputBlock>
      
      <OutputBlock title="CTA đề xuất">
        <p>{cta}</p>
      </OutputBlock>
    </div>
  );
};

export default OutputDisplay;