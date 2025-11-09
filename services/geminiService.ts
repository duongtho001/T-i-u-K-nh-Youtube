import { GoogleGenAI, Type } from "@google/genai";
import { OptimizedContent } from '../types';
import { getApiKeys, getCurrentApiKeyIndex, saveCurrentApiKeyIndex } from './apiKeys';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    titles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Array of 3-5 SEO-optimized title suggestions in the same language as the input."
    },
    description: {
      type: Type.STRING,
      description: "The rewritten, optimized video description in the same language as the input. Use placeholders like [link] for missing info."
    },
    tags: {
      type: Type.STRING,
      description: "A single string of comma-separated lowercase tags."
    },
    hashtags: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Array of 8-12 relevant hashtags (without the # prefix)."
    },
    chapters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING, description: "Timestamp in HH:MM:SS or MM:SS format." },
          title: { type: Type.STRING, description: "A concise title for the chapter." }
        },
        required: ["timestamp", "title"]
      },
      description: "Array of video chapters with timestamps and titles. If no timestamps are found, this should be an empty array."
    },
    cta: {
      type: Type.STRING,
      description: "A subtle call-to-action suggestion."
    }
  },
  required: ["titles", "description", "tags", "hashtags", "chapters", "cta"]
};

const getPrompt = (text: string): string => {
  if (!text.trim()) {
    return `The user provided no input. Please generate a placeholder template for a standard YouTube video (e.g., vlog or tutorial) in Vietnamese, following the required JSON schema. For example, the description should guide the user on what to fill in.`;
  }
  return `
You are an expert YouTube content optimization assistant. Your task is to take the user-provided text and transform it into a complete, ready-to-use package for a YouTube video.

**Input Text:**
"""
${text}
"""

**Instructions:**
1.  **Language:** Strictly respond in the same language as the input text. If the input is Vietnamese, your entire JSON output must be in Vietnamese.
2.  **Analyze and Generate:** Based on the input text, generate all required components.
3.  **Summarize:** First, understand the main topic of the input.
4.  **Titles:** Create 3-5 engaging, search-optimized titles.
5.  **Description:** Write a coherent, natural-sounding description. Place primary keywords in the first 1-2 sentences. Do not stuff keywords.
6.  **Tags:** Generate a comma-separated list of relevant lowercase tags.
7.  **Hashtags:** Suggest 8-12 relevant hashtags.
8.  **Chapters:** This is crucial. If timestamps (e.g., 0:00, 1:23, 10:45) are present, extract them and create a concise, relevant title for each chapter by analyzing the surrounding text. The first chapter must be "00:00 Intro". If no timestamps exist, return an empty array for chapters.
9.  **Call to Action (CTA):** Provide a subtle, effective CTA.
10. **Placeholders:** If information like links, names, or codes is missing, use placeholders like [link], [tên sản phẩm], [mã giảm giá].
11. **Rules:**
    - Do not use clickbait or misleading language.
    - Do not invent information.
    - Correct basic typos and grammar in the input before processing.
12. **Output Format:** You MUST return your response as a single JSON object matching the provided schema. Do not add any text, markdown formatting, or explanations before or after the JSON object.
`;
};

export const optimizeYouTubeContent = async (text: string): Promise<OptimizedContent> => {
    const keys = getApiKeys();
    if (keys.length === 0) {
        throw new Error("Vui lòng thêm API key của bạn trong phần Cài đặt.");
    }

    const startIndex = getCurrentApiKeyIndex();
    let lastError: Error | null = null;

    // Loop through keys starting from the last known good index
    for (let i = 0; i < keys.length; i++) {
        const keyIndex = (startIndex + i) % keys.length;
        const currentKey = keys[keyIndex];
        
        try {
            const ai = new GoogleGenAI({ apiKey: currentKey });
            const prompt = getPrompt(text);

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 0.7,
                },
            });
            
            const jsonString = response.text.trim();
            const parsedJson = JSON.parse(jsonString);

            // Save the working key index and return
            saveCurrentApiKeyIndex(keyIndex);
            return parsedJson as OptimizedContent;

        } catch (error) {
            console.warn(`API key at index ${keyIndex} failed.`, error);
            lastError = error instanceof Error ? error : new Error('Lỗi không xác định');
            
            // Heuristic check for quota-related errors
            const errorMessage = (error as any).message || '';
            if (errorMessage.includes('API key not valid') || errorMessage.includes('quota') || errorMessage.includes('exceeded') || errorMessage.includes('permission denied')) {
                // It's a key-specific error, try the next key
                continue;
            } else {
                // It's likely a different issue (e.g., network, bad prompt), so don't cycle keys
                throw lastError;
            }
        }
    }

    // If we've looped through all keys and none worked
    throw new Error(`Tất cả API key đều không hợp lệ hoặc đã hết hạn ngạch. Lỗi cuối cùng: ${lastError?.message}`);
};