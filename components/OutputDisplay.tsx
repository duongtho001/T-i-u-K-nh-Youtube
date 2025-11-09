import React from 'react';
import { OptimizedContent } from '../types';
import OutputBlock from './OutputBlock';

interface OutputDisplayProps {
  content: OptimizedContent;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ content }) => {
  const { titles, description, tags, hashtags, chapters, cta } = content;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-300">Kết quả Tối ưu</h2>
      
      <OutputBlock title="Tiêu đề đề xuất" isList>
        {titles.map((title, index) => (
          <li key={index} className="mb-1">{title}</li>
        ))}
      </OutputBlock>

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