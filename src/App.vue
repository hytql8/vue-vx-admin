<script setup lang="ts">
import { watch, onMounted, computed, toRaw, unref } from "vue"
import { useAppStore } from "@/store/modules/app"
import { useLocaleStore } from "@/store/modules/locale"
import { useTagsStore } from "@/store/modules/tags"
import { normalTheme, darkTheme } from "@/utils/theme"
import { useStorage } from "@/hooks/useStorage"
import { setCssVar } from "./utils"
import { setHtmlLang } from "@/hooks/useLocale"
import type { Language } from "element-plus/es/locale"
import { router } from "@/router"

const { getStorage } = useStorage()
const appStore = useAppStore()
const localeStore = useLocaleStore()
const tagsStore = useTagsStore()

// el组件语言配置
const elLocale = computed(() => toRaw(localeStore.currentLocale.elLang) as Language)
// 当前tags列表
const tagsList = computed(() => tagsStore.getTagsList)
// 获取当前路由列表的redirect
const redirect = router.getRoutes().find(v => v.path === "/").redirect
const defaultCurRoute = router.getRoutes().find(v => v.path === redirect)

console.log(defaultCurRoute, `========defaultCurRoute`)

// 初始化从storage中取 switch状态, 和主题配置， 语言设置默认
appStore.setIsDark(getStorage("isDark"))
localeStore.setCurrentLocale(localeStore.getCurrentLocale)
// 设置currentRouter
if (!unref(tagsList)?.length) {
  const arr: TagsList[] = []
  arr.push(
    Object.assign(unref(tagsList)[0] ?? {}, {
      title: defaultCurRoute.meta.title,
      path: defaultCurRoute.path,
      icon: defaultCurRoute.meta.icon,
      isFixed: true,
      current: true
    })
  )
  console.log(arr, `========arr`)
  tagsStore.setTagsList(arr)
}
console.log(tagsStore.getTagsList, `========getTagsList`)

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
