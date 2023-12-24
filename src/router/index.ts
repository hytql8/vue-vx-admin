import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/src/index.vue")

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/vx-admin/dashboard",
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
    path: "/vx-admin",
    name: "VxAdmin",
    component: Layout,
    meta: {
      title: "routes.vxAdmin"
    },
    children: [
      {
        path: "/vx-admin/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        meta: {
          title: "routes.vxAdmin"
        },
        children: [
          {
            path: "/vx-admin/dashboard1",
            name: "Dashboard1",
            component: () => import("@/views/Dashboard/Dashboard.vue"),
            meta: {
              title: "routes.Dashboard1"
            },
            children: [
              {
                path: "/vx-admin/dashboard2",
                name: "Dashboard2",
                component: () => import("@/views/Dashboard/Dashboard.vue"),
                meta: {
                  title: "routes.Dashboard2"
                },
                children: [
                  {
                    path: "/vx-admin/dashboard3",
                    name: "Dashboard3",
                    component: () => import("@/views/Dashboard/Dashboard.vue"),
                    meta: {
                      title: "routes.Dashboard3",
                      hidden: true
                    },
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Layout,
    meta: {
      title: "routes.welcome"
    },
    children: [
      {
        path: "/welcome/home",
        name: "Home",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "routes.home"
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
