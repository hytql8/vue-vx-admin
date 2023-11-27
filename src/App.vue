<script setup lang="ts">
import { useAppStore } from "@/store/modules/app"
import { darkTheme } from "@/utils/theme"

const { setTheme, setCssVarTheme } = useAppStore()
setTheme(darkTheme as ThemeTypes)
setCssVarTheme()
</script>

<template>
  <RouterView></RouterView>
</template>
<style lang="scss" scoped></style>
