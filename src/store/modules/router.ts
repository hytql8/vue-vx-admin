import { defineStore } from "pinia"
import { store } from "../index"
import type { RouteRecordRaw } from "vue-router"
import { useStorage } from "@/hooks/useStorage"

type RoutersState = {
  user: Recordable
  routers: RouteRecordRaw[]
}

const { setStorage, getStorage } = useStorage("localStorage")

export const useRoutersStore = defineStore("routers", {
  state: (): RoutersState => {
    return {
      user: getStorage("user") || {},
      routers: getStorage("asyncRouters") || []
    }
  },
  getters: {
    getUser(): Recordable {
      return this.user
    },
    getRouters(): RouteRecordRaw[] {
      return this.routers
    }
  },
  actions: {
    setUser(user: Recordable) {
      this.user = user
      setStorage("user", user)
    },
    setRouters(routers: RouteRecordRaw[]) {
      // this.routers = generateDynamicRouters(routers, mode, this.user)
      this.routers = routers
      setStorage("asyncRouters", this.routers)
    }
  }
})

export const useRoutersStoreWithOut = () => {
  return useRoutersStore(store)
}
