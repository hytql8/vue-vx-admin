import { i18n } from "@/plugins/vueI18n"
import { Ref } from "vue"

// 设置html的语言属性 lang
export const setHtmlLang = (currentLocale: CurrentLocale) => {
  document.querySelector("html")?.setAttribute("lang", currentLocale.lang)
}

const setI18nLanguage = (locale: LocaleMap) => {
  ;(i18n.global.locale as Ref).value = locale.lang
}

export const useCustomLocale = () => {
  const changeLocale = async (locale: LocaleMap) => {
    const globalI18n = i18n.global
    const langModule = await import(`../locales/lang/${locale.lang === "en" ? "en" : "cn"}.ts`)

    globalI18n.setLocaleMessage(locale.lang, langModule.default)
    setI18nLanguage(locale)
  }

  return {
    changeLocale
  }
}

// 此方法用于配合i18n-Ally翻译
export const t = (key: string) => key
