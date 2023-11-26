import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { store } from "../index"
// import { useDark, useToggle } from "@vueuse/core"

const { setStorage, getStorage } = useStorage()

interface appState {
  isDark: boolean
  layout: LayoutType
  theme: any
}

export const useAppStore = defineStore("app", {
  state: (): appState => {
    return {
      isDark: getStorage("isDark") || false,
      layout: getStorage("layout") || "horizontal",
      theme: {
        elPrimaryColor: "var(--theme-color)",
        themeTextColor: "var(--theme-text-color)",
        themeBgColor: "var(--theme-bg-color)"
      }
    }
  },
  getters: {
    getIsDark(): boolean {
      return this.isDark
    }
  },
  actions: {
    setIsDark(isDark: boolean) {
      console.log(isDark)

      this.isDark = isDark
      setStorage("isDark", this.isDark)
      // 先调用vueuse的方法把类名加上去
      //   const isDarkFun = useDark({
      //     storageKey: "isDark"
      //   })
      //   const toggleDark = useToggle(isDarkFun)
      //   toggleDark(this.isDark)
    }
  }
})
// setup外部调用pinia
export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
