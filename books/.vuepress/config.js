module.exports = {
    title: 'Vue.js 実践活用講座',
    description: 'HTML/CSS を使った Web 制作技術について、現場で使えるテクニックを紹介します。',
    head: [
        ['script', { src: "https://static.codepen.io/assets/embed/ei.js"}]
    ],
    locales: {
        '/': {
            lang: 'ja',
        },
    },
    markdown: {
        anchor: {
            level: [1,2,3],
            slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#'
        },
        config: md => {
            md.use(require('markdown-it-playground'))
        },
        linkify: true
    },
    themeConfig: {
        nav: [
            { text: 'Lec Café', link: 'https://leccafe.connpass.com/' },
        ],
        sidebar: [
            '/1.Vue.jsの環境構築/',
            '/2.Vue.jsで作る問い合わせフォーム/',
            '/3.Vue.jsで作るナビゲーション/',
            '/4.Vue.jsのコンポーネント管理/',
            '/5.Vue.js で作る SPA/',
          {
            title: '付録',
            collapsable: false,
            children: [
                '/8.1.Vue.jsのディレクティブ/',
                '/8.3.axios の活用/',
                '/8.4.Promise と Async Await/',
            ]
          },
        ],
        repo: 'chatbox-inc/leccafe-start-vuejs',
        repoLabel: 'Github',
        docsDir: 'books',
        editLinks: true,
        editLinkText: 'ページに不明点や誤字等があれば、Github にて修正を提案してください！'
    }
}
