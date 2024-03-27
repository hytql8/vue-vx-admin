import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { store } from "../index"
import { toCssVariable, setCssVar } from "@/utils"

const { setStorage, getStorage } = useStorage()

type appState = {
  isDark: boolean
  layout: LayoutType
  isFold: boolean
  isGroup: boolean
  isSeemMoblie: boolean
  isBreadcrumb: boolean
  isShowFolding: boolean
  isMourning: boolean
  isColorWeakness: boolean
  routerMode: RouterMode
  columnSize: string[]
  theme: ThemeTypes
}

export const useAppStore = defineStore("app", {
  state: (): appState => {
    return {
      // 是否暗黑模式，true代表是
      isDark: getStorage("isDark") || false,
      // 当前系统的layout布局 默认为 vertical
      layout: getStorage("layout") || "vertical",
      // 左侧菜单是否折叠
      isFold: getStorage("isFold") || false,
      // table密度
      columnSize: ["default", "large", "small"],
      // 菜单是否group模式
      isGroup: getStorage("isGroup") || false,
      // 当前页面可能是移动端
      isSeemMoblie: false,
      // 是否显示面包屑
      isBreadcrumb: getStorage("isBreadcrumb") || true,
      // 是否显示折叠菜单图标
      isShowFolding: getStorage("isShowFolding") || true,
      // 是否哀悼模式
      isMourning: getStorage("isMourning") || false,
      // 是否色弱模式
      isColorWeakness: getStorage("isColorWeakness") || false,
      // 路由模式
      routerMode: "async",
      // 默认主题 需要变化的项目这里需要定义默认值，建议与var.scss中保持一致
      theme: getStorage("theme") || {
        elColorPrimary: "#3a6ee8",
        themeColor: "#3a6ee8",
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
    getIsGroup(): boolean {
      return this.isGroup
    },
    getIsSeemMoblie(): boolean {
      return this.isSeemMoblie
    },
    getIsBreadcrumb(): boolean {
      return this.isBreadcrumb
    },
    getIsShowFolding(): boolean {
      return this.isShowFolding
    },
    getIsMourning(): boolean {
      return this.isMourning
    },
    getIsColorWeakness(): boolean {
      return this.isColorWeakness
    },
    getRouterMode(): RouterMode {
      return this.routerMode
    },
    getColumnSize(): string[] {
      return this.columnSize
    },
    getTheme(): ThemeTypes {
      return this.theme
    }
  },
  actions: {
    setLayout(layout: LayoutType) {
      this.layout = layout
      setStorage("layout", this.layout)
    },
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
    setIsSeemMoblie(isSeemMoblie: boolean) {
      this.isSeemMoblie = isSeemMoblie
      setStorage("isSeemMoblie", this.isSeemMoblie)
    },
    setIsGroup(isGroup: boolean) {
      this.isGroup = isGroup
      setStorage("isGroup", this.isGroup)
    },
    setIsBreadcrumb(isBreadcrumb: boolean) {
      this.isBreadcrumb = isBreadcrumb
      setStorage("isBreadcrumb", this.isBreadcrumb)
    },
    setIsShowFolding(isShowFolding: boolean) {
      this.isShowFolding = isShowFolding
      setStorage("isShowFolding", this.isShowFolding)
    },
    setIsMourning(isMourning: boolean) {
      this.isMourning = isMourning
      setStorage("isMourning", this.isMourning)
    },
    setIsColorWeakness(isColorWeakness: boolean) {
      this.isColorWeakness = isColorWeakness
      setStorage("isColorWeakness", this.isColorWeakness)
    },
    setRouterMode(routerMode: RouterMode) {
      this.routerMode = routerMode
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
