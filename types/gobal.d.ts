import { Language } from "element-plus/es/locale"

declare global {
  /**
   * 打包压缩格式的类型声明
   */
  type ViteCompression = "none" | "gzip" | "brotli" | "both" | "gzip-clear" | "brotli-clear" | "both-clear"

  // 全局定义vite环境变量type 对应.env.dev
  interface ViteEnv {
    VITE_APP_TITLE: string
    VITE_PORT: number
    VITE_PUBLIC_PATH: string
    VITE_ROUTER_HISTORY: string
    VITE_CDN: boolean
    VITE_COMPRESSION: ViteCompression
    VITE_REPORT: boolean
  }

  type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

  type Nullable<T> = T | null

  type IsDark = "auto" | "dark"

  type LayoutType = "vertical" | "horizontal" | "group"

  interface ThemeTypes {
    themeColor: string
    elColorPrimary: string
    themeTextColor: string
    themeBgColor: string
    themeDivColor: string
    dividerColor: string
    leftMenuBgColor: string
    leftMenuBgLightColor: string
    leftMenuBgActiveColor: string
    leftMenuTextColor: string
    leftMenuTextActiveColor: string
    leftMenuCollapseBgActiveColor: string
  }

  type Locales = "zh-CN" | "en"

  type CurrentLocale = {
    lang: Locales
    elLang?: Language
  }

  type LocaleMap = {
    lang: Locales
    name: string
  }

  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  type TagsList = {
    title: string
    path: string
    icon: string
    isFixed: boolean
    current: boolean
  }

  interface Fn<T = any, R = T> {
    (...arg: T[]): R
  }

  type ElementPlusInfoType = "success" | "info" | "warning" | "danger"
}

export {}
// 需要使用 var 不要使用 const 和 let
// 必须要添加 export {} 否则会报错：全局范围的扩大仅可直接嵌套在外部模块中或环境模块声明中
// global 包含的文件范围只以 tsconfig.json 为依据的
// tsconfig.json 作为根目录，下面的全部.ts 文件都共享这个 global
