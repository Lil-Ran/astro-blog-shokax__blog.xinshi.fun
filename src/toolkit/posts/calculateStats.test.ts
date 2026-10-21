import type { Post } from "./types";
import { describe, expect, it } from "vitest";
import { calculateReadTime, calculateTotalWords, countWords } from "./calculateStats";

describe("countWords", () => {
  it("should return 0 for empty string", () => {
    expect(countWords("")).toBe(0);
  });

  it("should count English words correctly", () => {
    expect(countWords("hello world")).toBe(2);
    expect(countWords("This is a test.")).toBe(4);
  });

  it("should count Chinese characters correctly", () => {
    expect(countWords("你好世界")).toBe(4);
  });

  it("should count mixed English and Chinese correctly", () => {
    expect(countWords("hello 你好 world")).toBe(4);
  });

  it("should handle punctuation and spaces", () => {
    expect(countWords("hello, world! 你好。")).toBe(4);
  });
});

describe("calculateTotalWords", () => {
  it("should return 0 for empty posts array", () => {
    expect(calculateTotalWords([])).toBe(0);
  });

  it("should calculate total words from posts with body", () => {
    const posts: Post[] = [
      {
        id: "1",
        collection: "posts",
        data: { title: "Test", date: new Date("2023-01-01"), encrypted: false },
        body: "hello world",
      },
      {
        id: "2",
        collection: "posts",
        data: { title: "Test2", date: new Date("2023-01-01"), encrypted: false },
        body: "你好世界",
      },
    ];
    expect(calculateTotalWords(posts)).toBe(6);
  });

  it("should prefer body over content", () => {
    const posts: Post[] = [
      {
        id: "1",
        collection: "posts",
        data: { title: "Test", date: new Date("2023-01-01"), encrypted: false },
        body: "new body",
      },
    ];
    expect(calculateTotalWords(posts)).toBe(2);
  });
});

describe("calculateReadTime", () => {
  it("返回 0 当字数或速度非正", () => {
    expect(calculateReadTime(0)).toBe(0);
    expect(calculateReadTime(-1)).toBe(0);
    expect(calculateReadTime(100, 0)).toBe(0);
  });

  it("使用向上取整策略", () => {
    expect(calculateReadTime(1)).toBe(1);
    expect(calculateReadTime(300)).toBe(1);
    expect(calculateReadTime(301)).toBe(2);
  });

  it("支持自定义每分钟字数", () => {
    expect(calculateReadTime(600, 200)).toBe(3);
  });
});
