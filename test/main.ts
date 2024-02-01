import { createApp } from 'vue'
import App from './App1.vue'

import './test.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
;(window as any).process = { env: {} }

createApp(App).use(ElementPlus).mount('#app')
