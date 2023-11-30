import { createApp } from "vue"
import App from "./App.vue"
import { router, setupRouter } from "@/router"
import { setupStore } from "@/store"
// 引入样式
import "animate.css"
import "./styles/reset.scss"
import "./styles/index.scss"

const setupApp = async () => {
  const app = createApp(App)
  // 在页面显示之前先等待router加载完毕
  setupRouter(app)
  await router.isReady()
  setupStore(app)
  app.mount("#app")
}
setupApp()
