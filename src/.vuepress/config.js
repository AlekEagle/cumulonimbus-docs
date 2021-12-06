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
        content: 'https://alekeagle.me/img/Cumulonimbus.webp'
      }
    ]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'AlekEagle/sharex-vue-docs',
    editLinks: true,
    docsDir: 'src',
    editLinkText: 'Edit this page on GitHub',
    smoothScroll: true,
    lastUpdated: true,
    logo: 'https://alekeagle.me/img/Cumulonimbus.webp',
    nav: [
      {
        text: 'Reference',
        link: '/reference/'
      },
      {
        text: 'API',
        link: '/api/'
      },
      {
        text: 'alekeagle.me',
        link: 'https://alekeagle.me/'
      }
    ],
    sidebar: [
      {
        title: 'API',
        path: '/api/',
        collapsable: true,
        sidebarDepth: 3,
        children: [
          '/api/',
          {
            title: 'Non-Administrative Endpoints',
            collapsable: true,
            children: ['/api/user/account']
          },
          {
            title: 'Administrative Endpoints',
            collapsable: true,
            children: ['/api/admin/account']
          }
        ]
      },
      {
        title: 'Reference',
        path: '/reference/',
        collapsable: true,
        sidebarDepth: 3,
        children: ['/reference/', '/reference/faq', 'reference/structs']
      }
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
