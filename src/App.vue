<script setup lang="ts">
import { watch, onMounted, computed, toRaw } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useLocaleStore } from "@/store/modules/locale"
import { normalTheme, darkTheme } from "@/utils/theme"
import { useStorage } from "@/hooks/useStorage"
import { setCssVar } from "./utils"
import { setHtmlLang } from "@/hooks/useLocale"
import type { Language } from "element-plus/es/locale"
import { tagsViewInit } from "@/components/TagsView"
import { useRouter } from "vue-router"
import { useWindowSize } from "@vueuse/core"

const { getStorage } = useStorage()
const appStore = useAppStore()
const localeStore = useLocaleStore()

const { push } = useRouter()
const { width, height } = useWindowSize()

// el组件语言配置
const elLocale = computed(() => toRaw(localeStore.currentLocale.elLang) as Language)

// 初始化从storage中取 switch状态, 和主题配置， 语言设置默认
appStore.setIsDark(getStorage("isDark"))
localeStore.setCurrentLocale(localeStore.getCurrentLocale)
// 初始化tagsList
const path = tagsViewInit()

// onMounted后开始加载store/storage中配置
onMounted(() => {
  appStore.setCssVarTheme()
  setHtmlLang(localeStore.getCurrentLocale)
  setCssVar("--el-color-primary", appStore.getTheme.elPrimaryColor)
  // tags初始化加载的默认跳转
  if (path) push(path)
})
watch(
  () => appStore.getIsDark,
  val => {
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
// 监听屏幕screen
watch([width, height], (val: number[]) => {
  appStore.setIsFold(val[0] < 1000)
})
</script>

<template>
  <ElConfigProvider :locale="elLocale" :message="{ max: 3 }">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>
