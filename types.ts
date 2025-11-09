
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
}
