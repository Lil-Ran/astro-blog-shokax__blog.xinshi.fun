// cannot use path alias here because unocss can not resolve it
import { defineConfig } from "./toolkit/themeConfig";

export default defineConfig({
  siteName: "LilRan 的博客",
  locale: "zh-CN",
  nav: [
    {
      text: "文章",
      href: "",
      icon: "i-ri-quill-pen-line",
      dropbox: {
        enable: true,
        items: [
          {
            text: "归档",
            href: "/archives/",
            icon: "i-ri-archive-line",
          },
          {
            text: "分类",
            href: "/categories/",
            icon: "i-ri-book-shelf-line",
          },
          {
            text: "标签",
            href: "/tags/",
            icon: "i-ri-price-tag-3-line",
          },
        ],
      },
    },
    {
      text: "友链",
      href: "/friends/",
      icon: "i-ri-link",
    },
    {
      text: "项目",
      href: "/projects/",
      icon: "i-ri-code-s-slash-line",
    },
    {
      text: "关于",
      href: "",
      icon: "i-ri-user-3-line",
      dropbox: {
        enable: true,
        items: [
          {
            text: "关于我",
            href: "/about/",
            icon: "i-ri-user-3-line",
          },
          {
            text: "一句话",
            href: "/sentence/",
            icon: "i-ri-pen-nib-line",
          },
          {
            text: "统计",
            href: "/statistics/",
            icon: "i-ri-bar-chart-box-line",
          },
        ],
      },
    },
  ],
  brand: {
    title: "LilRan 的博客",
    subtitle: "",
    logo: "",
  },
  cover: {
    enable: true,
    preload: true,
    advancedCarousel: false,
    fixedCover: {
      enable: false,
    },
    coverUrls: [],
    nextGradientCover: true,
  },
  sidebar: {
    author: "LilRan",
    description: "今日启程 无畏向前",
    social: {
      github: {
        url: "https://github.com/Lil-Ran",
        icon: "i-ri-github-fill",
        color: "var(--color-black)",
      },
      x: {
        url: "https://x.com/_LilRan_",
        icon: "i-ri-twitter-x-fill",
        color: "var(--color-black)",
      },
      bilibili: {
        url: "https://space.bilibili.com/478892019",
        icon: "i-ri-bilibili-fill",
        color: "#00AEEC",
      },
      email: {
        url: "mailto:lilran4869@qq.com",
        icon: "i-ri-mail-line",
        color: "#FDBC40",
      },
    },
  },
  footer: {
    since: 2024,
    icon: {
      name: "i-ri-flower-fill",
      color: "var(--color-pink)",
    },
    count: true,
    powered: true,
    icp: {
      enable: true,
      icpnumber: "粤ICP备2024192519号",
      icpurl: "https://beian.miit.gov.cn/",
    },
  },
  widgets: {
    randomPosts: true,
    recentComments: false,
  },
  home: {
    selectedCategories: [{ name: "ctf-writeups" }, { name: "tech-note" }],
    pageSize: 10,
    title: {
      behavior: "custom",
      customTitle: "LilRan 的博客 - 新实(xinshi.fun)",
    },
  },
  layout: {
    mode: "two-column",
  },
  friends: {
    title: "Hacked By {}",
    description: "",
    comments: false,
    avatar: "https://blog.xinshi.fun/assets/avatar.png",
    links: [],
  },
  copyright: {
    license: "CC-BY-NC-SA-4.0",
    show: true,
  },
  reward: {
    enable: true,
    accounts: {
      微信: "/assets/wechatpay.webp",
      支付宝: "/assets/alipay.webp",
    },
  },
});
