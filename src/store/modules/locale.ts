import { defineStore } from "pinia"
import { useStorage } from "@/hooks/useStorage"
import { store } from "../index"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import en from "element-plus/es/locale/lang/en"

const { setStorage, getStorage } = useStorage()

const elLocaleMap = {
  "zh-CN": zhCn,
  en: en
}
interface localeState {
  currentLocale: CurrentLocale
  localeMap: LocaleMap[]
}

export const useLocaleStore = defineStore("locale", {
  state: (): localeState => {
    return {
      currentLocale: {
        lang: getStorage("lang") || "zh-CN",
        elLang: elLocaleMap[getStorage("lang") || "zh-CN"]
      },
      localeMap: [
        {
          lang: "zh-CN",
          name: "简体中文"
        },
        {
          lang: "en",
          name: "English"
        }
      ]
    }
  },
  getters: {
    getCurrentLocale(): CurrentLocale {
      return this.currentLocale
    },
    getLocaleMap(): LocaleMap[] {
      return this.localeMap
    }
  },
  actions: {
    setCurrentLocale(localeMap: CurrentLocale) {
      this.currentLocale.lang = localeMap?.lang
      this.currentLocale.elLang = elLocaleMap[localeMap?.lang]
      setStorage("lang", localeMap?.lang)
    }
  }
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
