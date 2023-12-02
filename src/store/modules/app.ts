import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { store } from "../index"
import { toCssVariable, setCssVar } from "@/utils"
// import { normalTheme, darkTheme } from "@/utils/theme"

const { setStorage, getStorage } = useStorage()

interface appState {
  isDark: boolean
  layout: LayoutType
  theme: ThemeTypes
}

export const useAppStore = defineStore("app", {
  state: (): appState => {
    return {
      isDark: getStorage("isDark") || true,
      layout: getStorage("layout") || "horizontal",
      // 默认主题 需要变化的项目这里需要定义默认值，建议与var.less中保持一致
      theme: getStorage("theme") || {
        elPrimaryColor: "#3a6ee8",
        themeTextColor: "#252525",
        themeBgColor: "#f5f7f9",
        themeDivColor: "#fff"
      }
    }
  },
  getters: {
    getLayout(): LayoutType {
      return this.layout
    },
    getIsDark(): boolean {
      return this.isDark
    },
    getTheme(): ThemeTypes {
      return this.theme
    }
  },
  actions: {
    setIsDark(isDark: boolean) {
      this.isDark = isDark
      if (this.isDark) {
        document.documentElement.classList.add("dark")
        document.documentElement.classList.remove("light")
      } else {
        document.documentElement.classList.add("light")
        document.documentElement.classList.remove("dark")
      }
      setStorage("isDark", this.isDark)
    },
    setTheme(theme: ThemeTypes) {
      if (this.isDark) {
        this.theme = Object.assign(this.theme, theme)
      } else {
        this.theme = Object.assign(this.theme, theme)
      }
      setStorage("theme", this.theme)
    },
    setCssVarTheme() {
      for (const key in this.theme) {
        setCssVar(toCssVariable(key), this.theme[key])
      }
    }
  }
})
// setup外部调用pinia
export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
