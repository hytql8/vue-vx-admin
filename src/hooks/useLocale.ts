import { watch, ref, App } from "vue"
import { createI18n, useI18n } from "vue-i18n"
import { useLocaleStoreWithOut } from "@/store/modules/locale"
import cn from "@/locales/lang/cn"
import en from "@/locales/lang/en"
import { useStorage } from "@/hooks/useStorage"

const { getStorage } = useStorage()

const localeStore = useLocaleStoreWithOut()

const refLocale = ref<Locales>("zh-CN")

const i18n = createI18n({
  legacy: false,
  locale: refLocale.value, // 默认显示语言
  messages: {
    "zh-CN": cn,
    en: en
  }
})

watch(
  () => localeStore.getCurrentLocale,
  val => {
    i18n.global.locale.value = val.lang
  },
  {
    deep: true
  }
)
// 初始化I18n的值
i18n.global.locale.value = getStorage("lang")

export const useLocale = () => {
  const { t, locale } = useI18n({
    locale: refLocale.value,
    messages: {
      "zh-CN": { ...cn },
      en: { ...en }
    }
  })

  return { t, locale }
}
//vueI18n初始化
export const setupI18n = (app: App<Element>) => {
  app.use(i18n)
}
// 设置html的语言属性 lang
export const setHtmlLang = (currentLocale: CurrentLocale) => {
  document.querySelector("html")?.setAttribute("lang", currentLocale.lang)
}
