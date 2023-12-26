import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/src/index.vue")

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/dashboard/welcome",
    name: "Root"
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      title: "routes.login"
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    meta: {
      title: "routes.dashboard"
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () => import("@/views/Dashboard/Welcome.vue"),
        meta: {
          title: "routes.welcome"
        }
      },
      {
        path: "workplace",
        name: "Workplace",
        component: () => import("@/views/Dashboard/Workplace.vue"),
        meta: {
          title: "routes.workplace"
        }
      },
      {
        path: "analysis",
        name: "Analysis",
        component: () => import("@/views/Dashboard/Analysis.vue"),
        meta: {
          title: "routes.analysis"
        }
      }
    ]
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      title: "routes.notfound"
    }
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
