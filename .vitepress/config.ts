import { defineConfig } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress';

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    pwa: {
      outDir: '../.vitepress/dist',
      srcDir: './src',
      workbox: {
        globDirectory: './.vitepress/dist',
      },
      manifest: {
        scope: '/',
        start_url: '/',
        id: 'https://docs.alekeagle.me',
        name: 'Cumulonimbus Docs',
        short_name: 'Cumulonimbus Documentation',
        description: 'Cumulonimbus API Documentation',
        icons: [
          {
            src: 'https://alekeagle.me/icons/72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'https://alekeagle.me/icons/maskable.png',
            sizes: '1024x1024',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        theme_color: '#3e63dd',
        background_color: '#1b1b1f',
        display: 'standalone',
        orientation: 'portrait',
      },
    },
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
              text: 'Kill Switches',
              link: '/api/killswitches',
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
            {
              text: 'Migrating from v2',
              link: '/lib/migrating',
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
  }),
);
