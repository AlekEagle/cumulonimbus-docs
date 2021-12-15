const { description } = require('../../package');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Cumulonimbus API',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap'
      }
    ],
    ['link', { rel: 'icon', href: '/assets/images/Cumulonimbus.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'meta',
      {
        name: 'og:image',
        content: '/assets/images/Cumulonimbus.webp'
      }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'AlekEagle/cumulonimbus-docs',
    editLinks: true,
    docsDir: 'src',
    editLinkText: 'Edit this page on GitHub',
    smoothScroll: true,
    lastUpdated: true,
    logo: '/assets/images/Cumulonimbus.svg',
    nav: [
      {
        text: 'API',
        link: '/api/'
      },
      {
        text: 'Reference',
        link: '/reference/'
      },
      {
        text: 'alekeagle.me',
        link: 'https://alekeagle.me/'
      }
    ],
    sidebar: [
      {
        title: 'API',
        collapsable: true,
        sidebarDepth: 3,
        children: [
          '/api/',
          {
            title: 'Non-Administrative Endpoints',
            collapsable: true,
            children: [
              '/api/user/account',
              '/api/user/domain',
              '/api/user/file',
              '/api/user/instruction',
              '/api/user/session'
            ]
          },
          {
            title: 'Administrative Endpoints',
            collapsable: true,
            children: [
              '/api/admin/account',
              '/api/admin/domain',
              '/api/admin/file',
              '/api/admin/instruction',
              '/api/admin/session'
            ]
          }
        ]
      },
      {
        title: 'Reference',
        collapsable: true,
        sidebarDepth: 3,
        children: [
          '/reference/',
          '/reference/faq',
          {
            title: 'Structures',
            collapsable: true,
            children: [
              '/reference/structures/data',
              '/reference/structures/errors',
              '/reference/structures/successes'
            ]
          }
        ]
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
