import React, { useState, useEffect } from 'react';
import { getApiKeys, saveApiKeys } from '../services/apiKeys';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [keys, setKeys] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedKeys = getApiKeys();
      setKeys(storedKeys.join('\n'));
    }
  }, [isOpen]);

  const handleSave = () => {
    const keysArray = keys.split('\n').map(k => k.trim()).filter(Boolean);
    saveApiKeys(keysArray);
    onSave();
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 m-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-100">Cài đặt API Key</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <p className="text-gray-400 mb-4 text-sm">
            Dán các Gemini API key của bạn vào đây, mỗi key một dòng. Hệ thống sẽ tự động chuyển sang key tiếp theo nếu key hiện tại hết hạn ngạch.
        </p>
        <textarea
          value={keys}
          onChange={(e) => setKeys(e.target.value)}
          placeholder="AIzaSy...
AIzaSy..."
          className="w-full h-48 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none resize-none font-mono text-sm"
          aria-label="Danh sách API Keys"
        />
        <div className="mt-6 flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 transition-colors">Hủy</button>
            <button onClick={handleSave} className="px-5 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition-colors">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
