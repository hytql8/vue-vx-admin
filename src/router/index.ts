import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import { t } from "@/hooks/useLocale"

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
      title: t("routes.login")
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Layout,
    meta: {
      title: t("routes.dashboard"),
      icon: "ri:dashboard-line"
    },
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () => import("@/views/Dashboard/Welcome.vue"),
        meta: {
          title: t("routes.welcome"),
          icon: "fe:smile"
        }
      },
      {
        path: "workplace",
        name: "Workplace",
        component: () => import("@/views/Dashboard/Workplace.vue"),
        meta: {
          title: t("routes.workplace"),
          icon: "bx:bxs-briefcase-alt-2"
        }
      },
      {
        path: "analysis",
        name: "Analysis",
        component: () => import("@/views/Dashboard/Analysis.vue"),
        meta: {
          title: t("routes.analysis"),
          icon: "ri:line-chart-line"
        }
      }
    ]
  },
  {
    path: "/system",
    name: "System",
    component: Layout,
    meta: {
      title: t("routes.system"),
      icon: "ri:settings-3-line"
    },
    children: [
      {
        path: "user",
        name: "User",
        component: () => import("@/views/Dashboard/Analysis.vue"),
        meta: {
          title: t("routes.user"),
          icon: "mdi:account"
        }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/Dashboard/Analysis.vue"),
        meta: {
          title: t("routes.role"),
          icon: "mdi:account-group"
        }
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/Dashboard/Analysis.vue"),
        meta: {
          title: t("routes.menu"),
          icon: "mdi:menu"
        }
      }
    ]
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      title: t("routes.notfound"),
      icon: "mdi:arrow-up-bold"
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
