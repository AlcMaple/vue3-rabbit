// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引入自定义指令
// 全局指令注册
import { lazyPlugin } from '@/directives'

// 测试接口函数
// import { getCategoryAPI } from '@/apis/testAPI'
// getCategoryAPI().then(res => {
//     console.log(res)
// })

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

// 注册持久化插件
pinia.use(piniaPluginPersistedstate)

app.use(router)

app.use(ElementPlus).mount('#app')

app.use(lazyPlugin)