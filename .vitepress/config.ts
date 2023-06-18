import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cumulonimbus",
  description: "API Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://alekeagle.me/Cumulonimbus.webp",
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
      {
        text: "Reference",
        link: "/reference/",
        items: [
          {
            text: "Structures",
            link: "/reference/structures",
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "discord",
        link: "https://alekeagle.com/d",
      },
      {
        icon: "github",
        link: "https://github.com/AlekEagle/cumulonimbus-docs",
      },
    ],
  },
  srcDir: "src",
});
