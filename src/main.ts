import { createApp } from "vue"
import App from "./App.vue"
// element plus
import ElementPlus from "element-plus"
import { router, setupRouter } from "@/router"

import { setupStore } from "@/store"
// 引入样式
import "animate.css"
import "./styles/reset.scss"
import "./styles/var.scss"
import "element-plus/dist/index.css"
// import "element-plus/theme-chalk/dark/css-vars.css"
// import "element-plus/theme-chalk/src/common/var.css"

// createApp(App).mount("#app")
const setupApp = async () => {
  const app = createApp(App)
  // 在页面显示之前先等待router加载完毕
  setupRouter(app)
  await router.isReady()
  setupStore(app)
  app.use(ElementPlus).mount("#app")
}
setupApp()
