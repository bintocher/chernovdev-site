// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ChernovDev',
  tagline: 'Сайт про биай, в основном Qlik Sense, а так же личный блог',
  favicon: 'img/favicon.ico',

  staticDirectories: ['public', 'static'],

  // Set the production url of your site here
  url: 'https://chernodev.ru',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bintocher', // Usually your GitHub org/user name.
  projectName: 'chernovdev-site', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  plugins: [
    [ require.resolve('docusaurus-lunr-search'), {
    languages: ['ru','en'],
    highlightResult: true,
    maxHits: 10,
  }]
  , ['docusaurus-plugin-yandex-metrica', {
    counterID: '97252645',
  }],
],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: ''
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: ''
            // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'ChernovDev',
        logo: {
          alt: 'Qlik-lib Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Qlik документация',
          },
          {to: '/blog', label: 'Блог', position: 'left'},
          // {
          //   type: 'localeDropdown',position: 'right',
          // },
          {
            href: 'https://github.com/bintocher/chernovdev-site',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Блог',
        //     items: [
        //       {
        //         label: 'Qlik документация',
        //         to: '/docs/about',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Telegram channel',
        //         href: 'https://t.me/chernovdev',
        //       },
        //       {
        //         label: 'Github',
        //         href: 'https://github.com/bintocher/chernovdev-site',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Блог',
        //         to: '/blog',
        //       },
        //       // {
        //       //   label: 'GitHub',
        //       //   href: 'https://github.com/facebook/docusaurus',
        //       // },
        //     ],
        //   },
        // ],
        copyright: `Copyright © 2023 - ${new Date().getFullYear()} Stanislav Chernov`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
