import { defineHastPlugin, type HastPluginDefinition } from "satteri";
import type { Element } from "hast";

/**
 * autolink-headings（satteri 版）：为标题添加锚点链接
 *
 * 依赖标题上已存在的 id：markdown-satteri 内置的 heading-ids 插件排在用户
 * hastPlugins 之后执行，所以本插件前面必须挂一个 satteriHeadingIdsPlugin()
 * （见 astro.config.mjs 的 hastPlugins 顺序），否则标题还没有 id 会被跳过。
 */
export interface AutolinkHeadingsOptions {
  /** 行为模式：append（标题末尾追加 # 锚点）或 wrap（标题内容整体包进 <a>） */
  behavior?: "append" | "wrap";
  /** 锚点链接的 class 名 */
  className?: string;
  /** 处理的标题级别（1-6），默认仅 h1 */
  levels?: number[];
}

export default function autolinkHeadings(
  options: AutolinkHeadingsOptions = {},
): HastPluginDefinition {
  const behavior = options.behavior ?? "append";
  const className = options.className ?? "heading-anchor";
  const levels = options.levels ?? [1];

  return defineHastPlugin({
    name: "autolink-headings",
    element: {
      filter: levels.map((level) => `h${level}`),
      visit(node: Element, ctx) {
        const id = node.properties?.id;
        if (!id || typeof id !== "string") return;

        if (behavior === "wrap") {
          // 将标题的所有子节点包裹在 <a> 中
          const anchor: Element = {
            type: "element",
            tagName: "a",
            properties: {
              href: `#${id}`,
              class: className,
              "aria-label": "Permalink to this heading",
            },
            children: node.children,
          };
          ctx.setProperty(node, "children", [anchor]);
        } else {
          // 在标题末尾追加 # 锚点：悬浮显示，右键可复制链接地址。
          // 锚点内不放文本（# 由 CSS ::before 生成），否则 heading-ids 插件
          // 收集的 text 会带上 #，污染侧边栏 TOC 文案。
          ctx.appendChild(node, {
            type: "element",
            tagName: "a",
            properties: {
              href: `#${id}`,
              class: className,
              "aria-label": "本节链接",
              "data-pagefind-ignore": "",
            },
            children: [],
          });
        }
      },
    },
  });
}
