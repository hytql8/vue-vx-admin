import { App } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/src/index.vue")

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/vx-admin/dashboard",
    name: "Root",
    meta: {
      hidden: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: "/vx-admin",
    name: "VxAdmin",
    component: Layout,
    children: [
      {
        path: "/vx-admin/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
        children: [
          {
            path: "/vx-admin/dashboard1",
            name: "Dashboard1",
            component: () => import("@/views/Dashboard/Dashboard.vue"),
            children: [
              {
                path: "/vx-admin/dashboard2",
                name: "Dashboard2",
                component: () => import("@/views/Dashboard/Dashboard.vue"),
                children: [
                  {
                    path: "/vx-admin/dashboard3",
                    name: "Dashboard3",
                    component: () => import("@/views/Dashboard/Dashboard.vue"),
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
    children: [
      {
        path: "/welcome/home",
        name: "Home",
        component: () => import("@/views/Home/Home.vue")
      }
    ]
  },
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: () => import("@/views/Error/404.vue")
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
