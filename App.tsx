import React, { useState, useCallback, useEffect } from 'react';
import { optimizeYouTubeContent } from './services/geminiService';
import { OptimizedContent } from './types';
import InputArea from './components/InputArea';
import OutputDisplay from './components/OutputDisplay';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import SettingsModal from './components/SettingsModal';
import { getApiKeys } from './services/apiKeys';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [optimizedContent, setOptimizedContent] = useState<OptimizedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);

  const checkApiKeys = useCallback(() => {
    const keys = getApiKeys();
    setHasApiKeys(keys.length > 0);
  }, []);

  useEffect(() => {
    checkApiKeys();
  }, [checkApiKeys]);


  const handleOptimize = useCallback(async () => {
    if (!hasApiKeys) {
      setError("Vui lòng thiết lập API Key của bạn trong phần Cài đặt trước.");
      setIsSettingsOpen(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setOptimizedContent(null);

    try {
      const result = await optimizeYouTubeContent(inputText);
      setOptimizedContent(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định. Vui lòng kiểm tra API key và thử lại.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, hasApiKeys]);

  const Header = () => (
    <div className="text-center p-4 md:p-6 border-b border-gray-700 relative">
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
        aria-label="Cài đặt API Key"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <svg className="w-12 h-auto mx-auto mb-4" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.4623 3.0848C27.1473 1.8698 26.1773 0.914805 24.9523 0.599805C22.7873 0.00980473 14.0023 0.00980473 14.0023 0.00980473C14.0023 0.00980473 5.2173 0.00980473 3.0523 0.599805C1.8273 0.914805 0.857305 1.8698 0.542305 3.0848C-0.00269531 5.2798 -0.00269531 9.9998C-0.00269531 9.9998 -0.00269531 14.7198 0.542305 16.9148C0.857305 18.1298 1.8273 19.0848 3.0523 19.3998C5.2173 19.9898 14.0023 19.9898 14.0023 19.9898C14.0023 19.9898 22.7873 19.9898 24.9523 19.3998C26.1773 19.0848 27.1473 18.1298 27.4623 16.9148C28.0073 14.7198 28.0073 9.9998 28.0073 9.9998C28.0073 9.9998 28.0023 5.2798 27.4623 3.0848Z" fill="#FF0000"/>
        <path d="M11.2023 14.2848V5.7148L18.4023 9.9998L11.2023 14.2848Z" fill="white"/>
      </svg>
      <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
        Tối ưu Nội dung YouTube
      </h1>
      <p className="text-gray-400 mt-2">
        Dán bản ghi, ghi chú hoặc mô tả cũ để nhận tối ưu hóa từ AI.
      </p>
    </div>
  );

  const Footer = () => (
    <footer className="text-center p-4 mt-8 text-gray-500 text-sm space-y-2">
        <p>App của Thọ - 0934415387</p>
        <p>
            <a href="https://zalo.me/g/sgkzgk550" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
                Tham Gia Nhóm Zalo tạo App
            </a>
        </p>
        <p>Cung cấp bởi Gemini API</p>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <InputArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onOptimize={handleOptimize}
            isLoading={isLoading}
            hasApiKeys={hasApiKeys}
          />
          <div className="mt-8 lg:mt-0">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {optimizedContent && !isLoading && <OutputDisplay content={optimizedContent} />}
            {!isLoading && !error && !optimizedContent && (
              <div className="flex items-center justify-center h-full bg-gray-800/50 rounded-lg p-8 border-2 border-dashed border-gray-700">
                  <div className="text-center">
                    {!hasApiKeys ? (
                        <>
                            <p className="text-yellow-400 font-semibold">Vui lòng thiết lập API Key của bạn.</p>
                            <button onClick={() => setIsSettingsOpen(true)} className="mt-4 text-sm text-red-400 hover:underline">Mở Cài đặt</button>
                        </>
                    ) : (
                        <p className="text-gray-500">Nội dung được tối ưu sẽ xuất hiện ở đây.</p>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
       <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onSave={checkApiKeys}
      />
    </div>
  );
};

export default App;