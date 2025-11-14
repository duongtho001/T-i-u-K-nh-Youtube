import React from 'react';
import { Settings, Tone } from '../types';

interface SettingsPanelProps {
    settings: Settings;
    onSettingChange: (change: Partial<Settings>) => void;
}

const languageOptions = [
    { value: 'Auto', label: 'Tự động (theo nội dung vào)' },
    { value: 'Vietnamese', label: 'Tiếng Việt' },
    { value: 'English', label: 'Tiếng Anh' },
    { value: 'Japanese', label: 'Tiếng Nhật' },
    { value: 'Korean', label: 'Tiếng Hàn' },
    { value: 'Portuguese', label: 'Tiếng Bồ Đào Nha' },
    { value: 'Spanish', label: 'Tiếng Tây Ban Nha' },
    { value: 'Chinese', label: 'Tiếng Trung' },
];

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingChange }) => {
    return (
        <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 space-y-6">
            <h2 className="text-xl font-semibold text-gray-300">Tùy chỉnh</h2>

            {/* Language Setting */}
            <div>
                <label htmlFor="outputLanguage" className="text-gray-300 block mb-2 text-sm font-medium">Ngôn ngữ đầu ra</label>
                <select
                    id="outputLanguage"
                    value={settings.outputLanguage}
                    onChange={(e) => onSettingChange({ outputLanguage: e.target.value })}
                    className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                >
                    {languageOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Channel and Duration Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="channelName" className="text-gray-300 block mb-2 text-sm font-medium">Tên kênh</label>
                    <input
                        id="channelName"
                        type="text"
                        value={settings.channelName}
                        onChange={(e) => onSettingChange({ channelName: e.target.value })}
                        placeholder="Ví dụ: Thọ AI"
                        className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="videoDuration" className="text-gray-300 block mb-2 text-sm font-medium">Thời lượng video</label>
                    <input
                        id="videoDuration"
                        type="text"
                        value={settings.videoDuration}
                        onChange={(e) => onSettingChange({ videoDuration: e.target.value })}
                        placeholder="Ví dụ: 15:30"
                        className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                    />
                </div>
            </div>
            
            {/* Tone Settings */}
            <div>
                <label className="text-gray-300 block mb-2 text-sm font-medium">Giọng điệu</label>
                <div className="flex flex-wrap gap-2">
                    {Object.values(Tone).map((tone) => (
                        <button key={tone} onClick={() => onSettingChange({ tone })}
                            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${settings.tone === tone ? 'bg-red-600 text-white font-semibold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                            {tone}
                        </button>
                    ))}
                </div>
            </div>

            {/* Emoji Setting */}
            <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={settings.includeEmojis}
                        onChange={(e) => onSettingChange({ includeEmojis: e.target.checked })}
                        className="form-checkbox h-5 w-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-offset-gray-800"
                    />
                    <span className="text-gray-300 text-sm font-medium">Kèm theo icon (emoji)</span>
                </label>
            </div>
        </div>
    );
};

export default SettingsPanel;