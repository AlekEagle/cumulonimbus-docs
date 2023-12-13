import { defineConfig } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress';

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: 'Cumulonimbus',
  description: 'API Documentation',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://alekeagle.me/Cumulonimbus.webp',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/api/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Wrapper', link: '/lib/' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        link: '/api/',
        items: [
          {
            text: 'Account',
            link: '/api/account',
          },
          {
            text: 'Domain',
            link: '/api/domain',
          },
          {
            text: 'File',
            link: '/api/file',
          },
          {
            text: 'Instruction',
            link: '/api/instruction',
          },
          {
            text: 'Session',
            link: '/api/session',
          },
        ],
      },
      {
        text: 'Reference',
        link: '/reference/',
        items: [
          {
            text: 'Structures',
            link: '/reference/structures',
          },
          {
            text: 'Successes',
            link: '/reference/successes',
          },
          {
            text: 'Errors',
            link: '/reference/errors',
          },
        ],
      },
      {
        text: 'Wrapper',
        link: '/lib/',
        items: [
          {
            text: 'Cumulonimbus',
            link: '/lib/cumulonimbus',
          },
        ],
      },
    ],

    socialLinks: [
      {
        icon: 'discord',
        link: 'https://alekeagle.com/d',
      },
      {
        icon: 'github',
        link: 'https://github.com/AlekEagle/cumulonimbus-docs',
      },
    ],
    footer: {
      message: 'Made with ❤️ by Alek Evans (AlekEagle)',
    },
  },
  srcDir: 'src',
  cleanUrls: true,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://alekeagle.me/Cumulonimbus.webp',
      },
    ],
    [
      'meta',
      {
        name: 'og:image',
        content: 'https://alekeagle.me/Cumulonimbus.webp',
      },
    ],
  ],
}));
