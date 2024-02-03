import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { store } from "../index"
import { toCssVariable, setCssVar } from "@/utils"
// import { normalTheme, darkTheme } from "@/utils/theme"

const { setStorage, getStorage } = useStorage()

type appState = {
  isDark: boolean
  layout: LayoutType
  isFold: boolean
  theme: ThemeTypes
}

export const useAppStore = defineStore("app", {
  state: (): appState => {
    return {
      // 是否暗黑模式，true代表是
      isDark: getStorage("isDark") || true,
      // 当前系统的layout布局 默认为 horizontal
      layout: getStorage("layout") || "horizontal",
      // 左侧菜单是否折叠
      isFold: getStorage("isFold") || false,
      // 默认主题 需要变化的项目这里需要定义默认值，建议与var.less中保持一致
      theme: getStorage("theme") || {
        elPrimaryColor: "#3a6ee8",
        themeTextColor: "#252525",
        themeBgColor: "#f5f7f9",
        themeDivColor: "#fff",
        dividerColor: "#dbdcdd",
        leftMenuBgColor: "#001529",
        leftMenuBgLightColor: "#0f2438",
        leftMenuBgActiveColor: "var(--el-color-primary)",
        leftMenuTextColor: "#bfcbd9",
        leftMenuTextActiveColor: "#ffffff",
        leftMenuCollapseBgActiveColor: "var(--el-color-primary)"
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
    getIsFold(): boolean {
      return this.isFold
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
    setIsFold(isFold: boolean) {
      this.isFold = isFold
      setStorage("isFold", this.isFold)
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

export const useAppStoreWithOut = () => {
  return useAppStore(store)
}
