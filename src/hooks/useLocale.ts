import { i18n } from "@/plugins/vueI18n"
import { useLocaleStoreWithOut } from "@/store/modules/locale"

// 设置html的语言属性 lang
export const setHtmlLang = (currentLocale: CurrentLocale) => {
  document.querySelector("html")?.setAttribute("lang", currentLocale.lang)
}

const setI18nLanguage = (locale: CurrentLocale) => {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === "legacy") {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setCurrentLocale({
    lang: locale.lang
  })
  setHtmlLang(locale)
}

export const useLocale = () => {
  const changeLocale = async (locale: CurrentLocale) => {
    const globalI18n = i18n.global
    const langModule = await import(`../../locales/lang/${locale.lang === "en" ? "en" : "cn"}.ts`)

    globalI18n.setLocaleMessage(locale.lang, langModule.default)
    setI18nLanguage(locale)
  }

  return {
    changeLocale
  }
}
