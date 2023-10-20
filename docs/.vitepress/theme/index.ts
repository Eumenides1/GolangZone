import BlogTheme from '@sugarat/theme'
import { h } from 'vue'
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'

// 自定义样式重载
// import './style.scss'

// 自定义主题色
// import './user-theme.css'
export default {
    ...BlogTheme,
    Layout: h(BlogTheme.Layout, null, {
      'nav-bar-content-before': () => h(Documate, {
        endpoint: 'https://kyq3snf3am.us.aircode.run/ask',
      }),
    }),
  }
