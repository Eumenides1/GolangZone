import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: 'Golang Zone',
  description: 'Jaguarliu 的 GO 语言路书网站',
  lastUpdated: true,
  themeConfig: {
    lastUpdatedText: '上次更新于',
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: '关于作者', link: 'https://jaguarliu.me' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Eumenides1'
      }
    ]
  }
})
