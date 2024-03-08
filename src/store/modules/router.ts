import { defineStore } from "pinia"
import { store } from "../index"
import type { RouteRecordRaw } from "vue-router"
import { generateDynamicRouters } from "@/utils/routerUtils"
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
      routers: []
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
      console.log(user, "set User时的user")
      this.user = user
      setStorage("user", user)
    },
    setRouters(routers: RouteRecordRaw[], mode: RouterMode = "static") {
      console.log(this.user, "set其他属性时的user")
      this.routers = generateDynamicRouters(routers, mode, this.user)
    }
  }
})

export const useRoutersStoreWithOut = () => {
  return useRoutersStore(store)
}
