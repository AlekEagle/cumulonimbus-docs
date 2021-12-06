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
        link: '/api/reference.html'
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
    sidebar: {
      '/api/': [
        {
          title: 'Reference',
          collapsable: true,
          children: ['reference', 'structures']
        },
        {
          title: 'API',
          collapsable: true,
          children: ['', 'user', 'admin']
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom']
};
