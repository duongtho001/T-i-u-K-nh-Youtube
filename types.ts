export interface Chapter {
  timestamp: string;
  title: string;
}

export interface OptimizedContent {
  titles: string[];
  description: string;
  tags: string;
  hashtags: string[];
  chapters: Chapter[];
  cta: string;
  shortsTitles: string[];
}

export enum Tone {
  Default = 'Mặc định',
  Friendly = 'Thân thiện',
  Professional = 'Chuyên nghiệp',
  Humorous = 'Hài hước',
}

export interface Settings {
  tone: Tone;
  includeEmojis: boolean;
  channelName: string;
  videoDuration: string;
  outputLanguage: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  inputText: string;
  result: OptimizedContent;
  settings: Settings;
}
