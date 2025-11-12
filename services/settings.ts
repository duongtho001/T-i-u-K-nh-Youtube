import { Settings, Tone } from '../types';

const SETTINGS_STORAGE_KEY = 'youtube-optimizer-settings';

const defaultSettings: Settings = {
  tone: Tone.Default,
  includeEmojis: true,
  channelName: '',
  videoDuration: '',
  outputLanguage: 'Auto',
};

export function getSettings(): Settings {
  try {
    const settingsJson = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (settingsJson) {
      const savedSettings = JSON.parse(settingsJson);
      // Ensure all keys from defaultSettings are present
      return { ...defaultSettings, ...savedSettings };
    }
  } catch (error) {
    console.error("Failed to parse settings from localStorage", error);
  }
  return defaultSettings;
}

export function saveSettings(settings: Settings): void {
  try {
    const settingsJson = JSON.stringify(settings);
    localStorage.setItem(SETTINGS_STORAGE_KEY, settingsJson);
  } catch (error) {
    console.error("Failed to save settings to localStorage", error);
  }
}
