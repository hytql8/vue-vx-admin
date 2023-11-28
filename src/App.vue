<script setup lang="ts">
import { watch, onMounted } from "vue"
import { useAppStore } from "@/store/modules/app"
import { normalTheme, darkTheme } from "@/utils/theme"
import { useStorage } from "@/hooks/useStorage"

const { getStorage } = useStorage()
const app = useAppStore()
// 初始化从storage中取 switch状态, 和主题配置
app.setIsDark(getStorage("isDark"))

onMounted(() => app.setCssVarTheme())
watch(
  () => app.getIsDark,
  val => {
    console.log(val, getStorage("isDark"))
    if (val) {
      app.setTheme(darkTheme)
      app.setCssVarTheme()
    } else {
      app.setTheme(normalTheme)
      app.setCssVarTheme()
    }
  },
  { immediate: true }
)
</script>

<template>
  <RouterView></RouterView>
</template>
<style lang="scss" scoped></style>
