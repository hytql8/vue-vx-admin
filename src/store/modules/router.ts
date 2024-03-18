import { defineStore } from "pinia"
import { store } from "../index"
import type { RouteRecordRaw } from "vue-router"
import { useStorage } from "@/hooks/useStorage"

/**
 * @param user 用户的登录信息
 * @param routers 动态路由且为请求的原始路由，前端处理之前
 * @param menu 菜单所需要读取的路由，前端处理之后的路由
 */
type RoutersState = {
  user: Recordable
  routers: RouteRecordRaw[]
  menu: RouteRecordRaw[]
}

const { setStorage, getStorage } = useStorage("localStorage")

export const useRoutersStore = defineStore("routers", {
  state: (): RoutersState => {
    return {
      user: getStorage("user") || {},
      routers: getStorage("asyncRouters") || [],
      menu: getStorage("menu") || []
    }
  },
  getters: {
    getUser(): Recordable {
      return this.user
    },
    getRouters(): RouteRecordRaw[] {
      return this.routers
    },
    getMenu(): RouteRecordRaw[] {
      return this.menu
    }
  },
  actions: {
    setUser(user: Recordable) {
      this.user = user
      setStorage("user", user)
    },
    setRouters(routers: RouteRecordRaw[]) {
      this.routers = routers
      setStorage("asyncRouters", this.routers)
    },
    setMenu(menu: RouteRecordRaw[]) {
      this.menu = menu
      setStorage("menu", this.menu)
    }
  }
})

export const useRoutersStoreWithOut = () => {
  return useRoutersStore(store)
}
