import { HistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'youtube-optimizer-history';

export function getHistory(): HistoryItem[] {
  try {
    const historyJson = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (historyJson) {
      const history = JSON.parse(historyJson);
      if (Array.isArray(history)) {
        return history;
      }
    }
  } catch (error) {
    console.error("Failed to parse history from localStorage", error);
  }
  return [];
}

export function saveHistory(history: HistoryItem[]): void {
  try {
    const historyJson = JSON.stringify(history);
    localStorage.setItem(HISTORY_STORAGE_KEY, historyJson);
  } catch (error) {
    console.error("Failed to save history to localStorage", error);
  }
}

export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
    const history = getHistory();
    const newEntry: HistoryItem = {
        ...item,
        id: `hist_${Date.now()}`,
        timestamp: Date.now(),
    };
    
    // Prevent adding exact duplicates
    if (history.some(h => JSON.stringify(h.result) === JSON.stringify(newEntry.result))) {
        console.warn("History item already exists. Skipping save.");
        return;
    }

    const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep max 50 items
    saveHistory(updatedHistory);
}
