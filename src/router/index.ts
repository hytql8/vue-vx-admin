import { App } from "vue"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { t } from "@/hooks/useLocale"
import { useNProgress } from "@/hooks/useProgress"

const { start, done } = useNProgress()
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
    path: "/component",
    name: "Component",
    component: Layout,
    meta: {
      title: t("routes.component"),
      icon: "mingcute:components-fill"
    },
    children: [
      {
        path: "table",
        name: "Table",
        component: () => import("@/views/Component/Table/DefaultTable.vue"),
        meta: {
          title: t("routes.table"),
          icon: "mdi:table-edit"
        },
        children: [
          {
            path: "default-table",
            name: "DefaultTable",
            component: () => import("@/views/Component/Table/DefaultTable.vue"),
            meta: {
              title: t("routes.defaultTable")
            }
          }
        ]
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/views/Component/Form/DefaultForm.vue"),
        meta: {
          title: t("routes.form"),
          icon: "clarity:form-line"
        },
        children: [
          {
            path: "default-form",
            name: "DefaultForm",
            component: () => import("@/views/Component/Form/DefaultForm.vue"),
            meta: {
              title: t("routes.defaultForm")
            }
          },
          {
            path: "use-form",
            name: "UseForm",
            component: () => import("@/views/Component/Form/DefaultForm.vue"),
            meta: {
              title: t("routes.useForm")
            }
          }
        ]
      },
      {
        path: "charts",
        name: "Charts",
        component: () => import("@/views/Component/Echarts/Echarts.vue"),
        meta: {
          title: t("routes.chart"),
          icon: "solar:chart-2-bold-duotone"
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
        component: () => import("@/views/System/User.vue"),
        meta: {
          title: t("routes.user"),
          icon: "mdi:account"
        }
      },
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/System/Role.vue"),
        meta: {
          title: t("routes.role"),
          icon: "mdi:account-group"
        }
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/System/Menu.vue"),
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

router.beforeEach(async to => {
  start()
  let auth = true
  if (
    // 检查用户是否已登录
    !auth &&
    // ❗️ 避免无限重定向
    to.name !== "Login"
  ) {
    // 将用户重定向到登录页面
    return { name: "Login" }
  }
})

router.afterEach(() => {
  done()
})

// 在路由加载完毕后，导出之前将router注册方法导出
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
