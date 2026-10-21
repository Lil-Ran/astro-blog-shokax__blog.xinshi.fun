import { describe, expect, it } from "vitest";
import {
  buildSeoTags,
  resolveTwitterSite,
  toAbsoluteUrl,
  toOgLocale,
} from "./seoTags";

const SITE = "https://blog.xinshi.fun";

describe("toOgLocale", () => {
  it("replaces BCP 47 hyphen with underscore", () => {
    expect(toOgLocale("zh-CN")).toBe("zh_CN");
    expect(toOgLocale("zh-TW")).toBe("zh_TW");
    expect(toOgLocale("en")).toBe("en");
  });

  it("returns undefined for blank input", () => {
    expect(toOgLocale("   ")).toBeUndefined();
    expect(toOgLocale(undefined)).toBeUndefined();
  });
});

describe("toAbsoluteUrl", () => {
  it("resolves relative paths against the site url", () => {
    expect(toAbsoluteUrl("/posts/hello/", SITE)).toBe(
      "https://blog.xinshi.fun/posts/hello/",
    );
  });

  it("keeps absolute urls untouched", () => {
    expect(toAbsoluteUrl("https://cdn.example.com/a.png", SITE)).toBe(
      "https://cdn.example.com/a.png",
    );
    expect(toAbsoluteUrl("//cdn.example.com/a.png", SITE)).toBe(
      "//cdn.example.com/a.png",
    );
  });

  it("falls back to root-relative when site url is missing", () => {
    expect(toAbsoluteUrl("assets/a.png")).toBe("/assets/a.png");
    expect(toAbsoluteUrl("/assets/a.png")).toBe("/assets/a.png");
  });
});

describe("resolveTwitterSite", () => {
  it("extracts handle from x.com and twitter.com urls", () => {
    expect(resolveTwitterSite("https://x.com/_LilRan_")).toBe("_LilRan_");
    expect(resolveTwitterSite("https://www.twitter.com/foo")).toBe("foo");
  });

  it("returns undefined for non matching urls", () => {
    expect(resolveTwitterSite("mailto:a@b.com")).toBeUndefined();
    expect(resolveTwitterSite(undefined)).toBeUndefined();
  });
});

describe("buildSeoTags", () => {
  const base = {
    siteName: "LilRan 的博客",
    title: "文章标题",
    siteUrl: SITE,
    locale: "zh-CN",
  };

  it("emits core og tags and twitter card for website pages", () => {
    const tags = buildSeoTags({
      ...base,
      description: "描述",
      url: "/posts/hello/",
    });

    expect(tags).toContainEqual({ property: "og:type", content: "website" });
    expect(tags).toContainEqual({ property: "og:title", content: "文章标题" });
    expect(tags).toContainEqual({ property: "og:description", content: "描述" });
    expect(tags).toContainEqual({
      property: "og:url",
      content: "https://blog.xinshi.fun/posts/hello/",
    });
    expect(tags).toContainEqual({
      property: "og:locale",
      content: "zh_CN",
    });
    expect(tags).toContainEqual({
      name: "twitter:card",
      content: "summary",
    });
    expect(tags).not.toContainEqual(
      expect.objectContaining({ property: "article:published_time" }),
    );
  });

  it("switches twitter card when an image is present", () => {
    const tags = buildSeoTags({
      ...base,
      image: { src: "/assets/avatar.png", width: 960, height: 960 },
    });

    expect(tags).toContainEqual({
      property: "og:image",
      content: "https://blog.xinshi.fun/assets/avatar.png",
    });
    expect(tags).toContainEqual({ property: "og:image:width", content: "960" });
    expect(tags).toContainEqual({ property: "og:image:height", content: "960" });
    expect(tags).toContainEqual({
      name: "twitter:card",
      content: "summary_large_image",
    });
  });

  it("emits article metadata only for article type", () => {
    const tags = buildSeoTags({
      ...base,
      type: "article",
      publishedTime: new Date("2024-01-02T03:04:05.000Z"),
      modifiedTime: new Date("2025-06-07T08:09:10.000Z"),
      author: "LilRan",
      tags: ["Astro", "  "],
      twitterSite: "_LilRan_",
    });

    expect(tags).toContainEqual({
      property: "article:published_time",
      content: "2024-01-02T03:04:05.000Z",
    });
    expect(tags).toContainEqual({
      property: "article:modified_time",
      content: "2025-06-07T08:09:10.000Z",
    });
    expect(tags).toContainEqual({ property: "article:author", content: "LilRan" });
    expect(tags).toContainEqual({ property: "article:tag", content: "Astro" });
    expect(tags).not.toContainEqual({ property: "article:tag", content: "" });
    expect(tags).toContainEqual({ name: "twitter:site", content: "@_LilRan_" });
    expect(tags).toContainEqual({
      name: "twitter:creator",
      content: "@_LilRan_",
    });
  });

  it("skips blank values and adds robots when noindex is set", () => {
    const tags = buildSeoTags({
      ...base,
      description: "   ",
      type: "article",
      noindex: true,
    });

    expect(tags).toContainEqual({
      name: "robots",
      content: "noindex, nofollow",
    });
    expect(tags.some((tag) => tag.content === "")).toBe(false);
    expect(
      tags.some((tag) => tag.property === "og:description"),
    ).toBe(false);
  });
});
