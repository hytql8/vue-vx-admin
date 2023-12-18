<script setup lang="ts">
import { watch, onMounted, computed, toRaw } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useLocaleStore } from "@/store/modules/locale"
import { normalTheme, darkTheme } from "@/utils/theme"
import { useStorage } from "@/hooks/useStorage"
import { setCssVar } from "./utils"
import { setHtmlLang } from "@/hooks/useLocale"
import type { Language } from "element-plus/es/locale"

const { getStorage } = useStorage()
const appStore = useAppStore()
const localeStore = useLocaleStore()

// el组件语言配置
const elLocale = computed(() => toRaw(localeStore.currentLocale.elLang) as Language)

// 初始化从storage中取 switch状态, 和主题配置， 语言设置默认
appStore.setIsDark(getStorage("isDark"))
localeStore.setCurrentLocale(localeStore.getCurrentLocale)

// onMounted后开始加载store/storage中配置
onMounted(() => {
  appStore.setCssVarTheme()
  setHtmlLang(localeStore.getCurrentLocale)
  setCssVar("--el-color-primary", appStore.getTheme.elPrimaryColor)
})
watch(
  () => appStore.getIsDark,
  val => {
    console.log(val, getStorage("isDark"))
    if (val) {
      appStore.setTheme(darkTheme)
      appStore.setCssVarTheme()
    } else {
      appStore.setTheme(normalTheme)
      appStore.setCssVarTheme()
    }
  },
  { immediate: true }
)
</script>

<template>
  <ElConfigProvider :locale="elLocale" :message="{ max: 3 }">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>
