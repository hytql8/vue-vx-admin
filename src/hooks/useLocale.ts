import { computed } from "vue"
import { createI18n } from "vue-i18n"
import { useLocaleStore } from "@/store/modules/locale"
import cn from "@/locales/lang/cn"
import en from "@/locales/lang/en"

const localeStore = useLocaleStore()

const currentLocale = computed(() => localeStore.getCurrentLocale)
const localeMap = computed(() => localeStore.getLocaleMap)

const i18n = createI18n({
  legacy: false,
  locale: "zh-CN", // 默认显示语言
  messages: {
    "zh-CN": cn,
    en: en
  }
})

export const useLocale = () => {}
