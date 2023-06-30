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
        link: "/api/",
        items: [
          {
            text: "Account",
            link: "/api/account",
          },
          {
            text: "Domain",
            link: "/api/domain",
          },
          {
            text: "File",
            link: "/api/file",
          },
        ],
      },
      {
        text: "Reference",
        link: "/reference/",
        items: [
          {
            text: "Structures",
            link: "/reference/structures",
          },
          {
            text: "Successes",
            link: "/reference/successes",
          },
          {
            text: "Errors",
            link: "/reference/errors",
          },
        ],
      },
      {
        text: "Wrapper",
        link: "/lib/",
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
    footer: {
      message: "Made with ❤️ by Alek Evans (AlekEagle)",
    },
  },
  srcDir: "src",
  cleanUrls: true,
});
