const API_KEYS_STORAGE_KEY = 'youtube-optimizer-api-keys';
const CURRENT_API_KEY_INDEX_KEY = 'youtube-optimizer-current-key-index';

export function getApiKeys(): string[] {
  try {
    const keysJson = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (keysJson) {
      const keys = JSON.parse(keysJson);
      if (Array.isArray(keys)) {
        return keys.filter(key => typeof key === 'string' && key.trim() !== '');
      }
    }
  } catch (error) {
    console.error("Failed to parse API keys from localStorage", error);
  }
  return [];
}

export function saveApiKeys(keys: string[]): void {
  localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
  // Reset index to start with the first new key
  localStorage.setItem(CURRENT_API_KEY_INDEX_KEY, '0');
}

export function getCurrentApiKeyIndex(): number {
    const indexStr = localStorage.getItem(CURRENT_API_KEY_INDEX_KEY);
    if (indexStr) {
        const index = parseInt(indexStr, 10);
        return isNaN(index) ? 0 : index;
    }
    return 0;
}

export function saveCurrentApiKeyIndex(index: number): void {
    localStorage.setItem(CURRENT_API_KEY_INDEX_KEY, index.toString());
}
