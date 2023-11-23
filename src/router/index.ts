import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Root",
    meta: {
      hidden: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: import("@/views/Login/Login.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/layout/src/index.vue")
  }
  // 其他路由配置
]

export const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter
})

// 在路由加载完毕后，导出之前将router注册方法导出
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
