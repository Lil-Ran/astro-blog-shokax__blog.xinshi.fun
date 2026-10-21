export type OgType = "website" | "article" | "profile";

export interface OgImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface SeoTagInput {
  /** 站点名，用于 og:site_name */
  siteName: string;
  /** 页面标题（调用方决定是否拼接站点名） */
  title: string;
  description?: string;
  /** 相对路径会拼接为绝对地址 */
  url?: string;
  image?: string | OgImage;
  imageAlt?: string;
  type?: OgType;
  /** BCP 47 语言标签，如 zh-CN */
  locale?: string;
  /** 站点根地址，用于把相对路径补全为绝对地址 */
  siteUrl?: string;
  publishedTime?: Date;
  modifiedTime?: Date;
  author?: string;
  tags?: string[];
  /** Twitter/X 账号（不含 @） */
  twitterSite?: string;
  noindex?: boolean;
}

export type SeoTag = Record<string, string>;

/** og:locale 使用下划线分隔（zh_CN），BCP 47 则是连字符 */
export function toOgLocale(locale?: string): string | undefined {
  const value = locale?.trim();
  if (!value) return undefined;
  return value.replace("-", "_");
}

/** 从社交主页 URL 中提取账号名（不含 @），用于 twitter:site / twitter:creator */
export function resolveTwitterSite(url?: string): string | undefined {
  const match = url?.trim().match(/^https?:\/\/(?:www\.)?(?:twitter|x)\.com\/([^/?#]+)/i);
  return match?.[1];
}

/** 把站内相对路径补全为绝对地址；已经是绝对地址或 data: 的原样返回 */
export function toAbsoluteUrl(
  url: string | undefined,
  siteUrl?: string,
): string | undefined {
  const value = url?.trim();
  if (!value) return undefined;
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value)) return value;

  const base = siteUrl?.trim();
  if (!base) return value.startsWith("/") ? value : `/${value}`;

  try {
    return new URL(value, base).toString();
  } catch {
    return value;
  }
}

function normalizeImage(
  image: string | OgImage | undefined,
  imageAlt: string | undefined,
): OgImage | undefined {
  if (!image) return undefined;

  const normalized: OgImage = typeof image === "string" ? { src: image } : image;
  const alt = normalized.alt ?? imageAlt;

  return alt ? { ...normalized, alt } : normalized;
}

function pushIf(
  tags: SeoTag[],
  attribute: "property" | "name",
  key: string,
  value: string | undefined,
) {
  const content = value?.trim();
  if (content) tags.push({ [attribute]: key, content });
}

/**
 * 生成 Open Graph / Twitter Card / robots meta 标签列表。
 * - 空值一律跳过，避免输出 content="" 被爬虫当成有效内容
 * - article:* 系列仅在 type 为 article 时输出
 */
export function buildSeoTags(input: SeoTagInput): SeoTag[] {
  const {
    siteName,
    title,
    description,
    url,
    image,
    imageAlt,
    type = "website",
    locale,
    siteUrl,
    publishedTime,
    modifiedTime,
    author,
    tags = [],
    twitterSite,
    noindex,
  } = input;

  const metaTags: SeoTag[] = [];

  if (noindex) {
    pushIf(metaTags, "name", "robots", "noindex, nofollow");
  }

  const resolvedImage = normalizeImage(image, imageAlt);
  const imageUrl = toAbsoluteUrl(resolvedImage?.src, siteUrl);

  pushIf(metaTags, "property", "og:type", type);
  pushIf(metaTags, "property", "og:title", title);
  pushIf(metaTags, "property", "og:description", description);
  pushIf(metaTags, "property", "og:url", toAbsoluteUrl(url, siteUrl));
  pushIf(metaTags, "property", "og:site_name", siteName);
  pushIf(metaTags, "property", "og:locale", toOgLocale(locale));
  pushIf(metaTags, "property", "og:image", imageUrl);
  pushIf(metaTags, "property", "og:image:alt", resolvedImage?.alt);
  if (resolvedImage?.width && resolvedImage?.height) {
    pushIf(metaTags, "property", "og:image:width", String(resolvedImage.width));
    pushIf(metaTags, "property", "og:image:height", String(resolvedImage.height));
  }

  if (type === "article") {
    pushIf(
      metaTags,
      "property",
      "article:published_time",
      publishedTime?.toISOString(),
    );
    pushIf(
      metaTags,
      "property",
      "article:modified_time",
      modifiedTime?.toISOString(),
    );
    pushIf(metaTags, "property", "article:author", author);
    tags.forEach((tag) => pushIf(metaTags, "property", "article:tag", tag));
  }

  pushIf(
    metaTags,
    "name",
    "twitter:card",
    imageUrl ? "summary_large_image" : "summary",
  );
  pushIf(
    metaTags,
    "name",
    "twitter:site",
    twitterSite ? `@${twitterSite}` : undefined,
  );
  pushIf(
    metaTags,
    "name",
    "twitter:creator",
    twitterSite ? `@${twitterSite}` : undefined,
  );
  pushIf(metaTags, "name", "twitter:title", title);
  pushIf(metaTags, "name", "twitter:description", description);
  pushIf(metaTags, "name", "twitter:image", imageUrl);

  return metaTags;
}
