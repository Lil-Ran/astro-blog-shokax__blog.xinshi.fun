import type { Post } from "./types";

export const DEFAULT_WORDS_PER_MINUTE = 300;

/**
 * 统计文本字数：中文按字符计数，英文等其他文字按空白分隔的单词计数
 */
export function countWords(text: string): number {
  if (!text) return 0;

  const cleanedText = text.replaceAll(/[^\w\s\u4E00-\u9FFF]/g, "");

  const chineseCount = (cleanedText.match(/[\u4E00-\u9FFF]/g) || []).length;

  const englishText = cleanedText.replaceAll(/[\u4E00-\u9FFF]/g, "");
  const englishCount = englishText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  return chineseCount + englishCount;
}

/**
 * 汇总多篇文章的总字数
 */
export function calculateTotalWords(posts: Post[]): number {
  return posts.reduce((total, post) => {
    const content = post.body || "";
    return total + countWords(content);
  }, 0);
}

/**
 * 由字数估算阅读时长（分钟，向上取整）
 */
export function calculateReadTime(
  wordCount: number,
  wordsPerMinute: number = DEFAULT_WORDS_PER_MINUTE,
): number {
  if (wordCount <= 0 || wordsPerMinute <= 0) {
    return 0;
  }

  return Math.ceil(wordCount / wordsPerMinute);
}
