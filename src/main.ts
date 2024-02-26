import { useStore } from "@/store/store";
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router/router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@wangeditor/editor/dist/css/style.css"; // 引入文本编辑器的css

import 'element-plus/dist/index.css'

const store = useStore
console.log(store);

const app = createApp(App)
const pinia =createPinia()
//配置ele plus 的icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
    .use(router)
    .use(ElementPlus, {size: 'small', zIndex: 3000})
    

app.mount('#app')
