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
      {
        text: 'Go 简明教程',
        items: [
          { text: '语法基础', 
            items: [
              {text: '变量定义', link: '/middleware/jaguarweb/jaguarweb'}
            ]
          },
          { text: ' Web开发', 
            items: [
              {text: 'gin 框架入门', link: '/middleware/jaguarorm/jaguarorm'},
              {text: 'gorm 入门', link: '/middleware/jaguarorm/yaoci'}
            ],
          },
          { text: '并发编程', 
            items: [
              {text: '待更新', link: '...'}
            ]
          },
        ]
      },
      {
        text: 'GO 实战项目',
        items: [
          { text: '菜鸟客栈', link: '/project/rookiestack.md' }
        ]
      },
      {
        text: '算法',
        items: [
          { text: 'leetCode', 
            items: [
              {text: '数组', link: '/middleware/jaguarweb/jaguarweb'}
            ]
          },
          { text: '面试题', 
            items: [
              {text: '待更新', link: '...'}
            ],
          }
        ]
      },
      {
        text: '中间件设计',
        items: [
          { text: 'Web 中间件', 
            items: [
              {text: 'Jaguar Web', link: '/middleware/jaguarweb/jaguarweb'}
            ]
          },
          { text: '数据库中间件', 
            items: [
              {text: 'Jaguar Orm', link: '/middleware/jaguarorm/jaguarorm'},
              {text: 'YaoCi瑶池', link: '/middleware/jaguarorm/yaoci'}
            ],
          },
          { text: 'Gin 插件', 
            items: [
              {text: '待更新', link: '...'}
            ]
          },
        ]
      },
      {
        text: 'Hi~Go 周刊',
        items: [
          { text: '酷的库', link: '/gocolumn/mod/' },
          { text: '帅的项目', link: '/gocolumn/project/' }
        ]
      },
      {
        text: '杂记',
        items: [
          { text: '迷茫的时候看看吧', link: '/note/tostudy' },
          { text: 'Why Go', link: '/note/whygo' },
          { text: 'Java To Go', link: '/note/javatogo' }
        ]
      },
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
