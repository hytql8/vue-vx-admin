<script setup lang="ts">
import { watch } from "vue"
import { useAppStore } from "@/store/modules/app"
import { normalTheme, darkTheme } from "@/utils/theme"
import { useStorage } from "@/hooks/useStorage"

const { getStorage } = useStorage()

const app = useAppStore()

setTimeout(() => {
  app.setCssVarTheme()
}, 100)

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
