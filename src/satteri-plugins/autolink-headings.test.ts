import { describe, expect, it } from "vitest";
import { createSatteriMarkdownProcessor, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import autolinkHeadings from "./autolink-headings";

async function render(markdown: string, plugin = autolinkHeadings()) {
  const processor = await createSatteriMarkdownProcessor({
    features: { headingAttributes: true },
    mdastPlugins: [],
    // markdown-satteri 内置 heading-ids 排在用户插件之后，必须自己先挂一遍
    hastPlugins: [satteriHeadingIdsPlugin, () => plugin],
  });
  const { code, metadata } = await processor.render(markdown, {});
  return { code, headings: metadata.headings };
}

describe("autolinkHeadings", () => {
  it("h1 末尾追加 # 锚点", async () => {
    const { code } = await render("# 一个标题\n");
    expect(code).toContain(
      `<h1 id="一个标题">一个标题<a href="#一个标题" class="heading-anchor" aria-label="本节链接" data-pagefind-ignore=""></a></h1>`,
    );
  });

  it("默认不处理 h2 及以下", async () => {
    const { code } = await render("## Sub\n");
    expect(code.trim()).toBe(`<h2 id="sub">Sub</h2>`);
  });

  it("levels 可指定多个级别", async () => {
    const { code } = await render("## A\n\n### B\n", autolinkHeadings({ levels: [2, 3] }));
    expect(code).toContain(`<a href="#a" class="heading-anchor"`);
    expect(code).toContain(`<a href="#b" class="heading-anchor"`);
  });

  it("锚点无文本，标题 text 不被污染", async () => {
    const { code, headings } = await render("# 标题\n");
    expect(code).not.toContain(">#</a>");
    expect(headings).toEqual([{ depth: 1, slug: "标题", text: "标题" }]);
  });

  it("重名标题的锚点跟随去重后的 id", async () => {
    const { code } = await render("# A\n\n# A\n");
    expect(code).toContain(`<a href="#a" class="heading-anchor"`);
    expect(code).toContain(`<a href="#a-1" class="heading-anchor"`);
  });

  it("尊重 headingAttributes 自定义 id", async () => {
    const { code } = await render("# 自定义 {#my-id}\n");
    expect(code).toContain(`<a href="#my-id" class="heading-anchor"`);
  });

  it("wrap 模式把标题内容包进锚点", async () => {
    const { code } = await render("# 标题\n", autolinkHeadings({ behavior: "wrap" }));
    expect(code.trim()).toBe(
      `<h1 id="标题"><a href="#标题" class="heading-anchor" aria-label="Permalink to this heading">标题</a></h1>`,
    );
  });

  it("跨文档 slugger 计数重置", async () => {
    const processor = await createSatteriMarkdownProcessor({
      features: { headingAttributes: true },
      mdastPlugins: [],
      hastPlugins: [satteriHeadingIdsPlugin, () => autolinkHeadings()],
    });
    const first = await processor.render("# A\n", {});
    const second = await processor.render("# A\n", {});
    expect(second.code).toBe(first.code);
  });
});
