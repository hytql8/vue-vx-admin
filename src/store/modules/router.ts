import { defineStore } from "pinia"
import { store } from "../index"
import type { RouteRecordRaw } from "vue-router"
import { generateDynamicRouters } from "@/utils/routerUtils"

type RoutersState = {
  routers: RouteRecordRaw[]
}

export const useRoutersStore = defineStore("routers", {
  state: (): RoutersState => {
    return {
      routers: []
    }
  },
  getters: {
    getRouters(): RouteRecordRaw[] {
      return this.getRouters
    }
  },
  actions: {
    setRouters(routers: RouteRecordRaw[], mode: RouterMode = "static") {
      //   console.log(routers, mode, "RoutersState===")
      console.log(generateDynamicRouters(routers))
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useRoutersStore(store)
}
