import { unref, computed } from "vue"
import type { RouteRecordRaw } from "vue-router"
import { router, staticRouter } from "@/router"
import { useRoutersStoreWithOut } from "@/store/modules/router"
import { useAppStoreWithOut } from "@/store/modules/app"
import { generateDynamicRouters } from "@/utils/routerUtils"
import { useNProgress } from "@/hooks/useProgress"
import { useStorage } from "@/hooks/useStorage"

const { start, done } = useNProgress()
const routersStore = useRoutersStoreWithOut()
const appStore = useAppStoreWithOut()
const { getStorage } = useStorage("localStorage")

const mode = computed(() => appStore.getRouterMode)

const cashRoutes = routersStore.getRouters.length ? routersStore.getRouters : staticRouter
// 创建路由
export const createRouter = (asyncRouters: RouteRecordRaw[] = cashRoutes) => {
  let asyncFinalRouter = [] as RouteRecordRaw[]
  asyncFinalRouter = generateDynamicRouters(asyncRouters, unref(mode), routersStore.user)
  router.getRoutes().map((v: RouteRecordRaw) => {
    router.removeRoute(v.name)
  })
  asyncFinalRouter.map((v: RouteRecordRaw) => {
    router.addRoute(v)
  })
}

// 如果未登录过默认不执行,实际可换成token
const isAuth = getStorage("user") ? true : false
if (isAuth) {
  createRouter(cashRoutes)
}

router.beforeEach((to, from, next) => {
  start()
  if (to.path !== "/login" && !isAuth) {
    next("/login") // 如果未验证，跳转到登录页
  } else {
    next() // 继续路由导航
  }
})

router.afterEach(() => {
  done()
})
