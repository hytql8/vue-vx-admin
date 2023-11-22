import { createApp } from "vue"
import App from "./App.vue"
// element plus
import ElementPlus from "element-plus"
import { router, setupRouter } from "@/router"
// 引入样式
import "./styles/reset.scss"
import "./styles/index.scss"

// createApp(App).mount("#app")
const setupApp = async () => {
  const app = createApp(App)
  // 在页面显示之前先等待router加载完毕
  setupRouter(app)
  await router.isReady()
  app.use(ElementPlus).mount("#app")
}
setupApp()
