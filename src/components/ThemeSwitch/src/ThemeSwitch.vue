<script lang="ts" setup>
import { ref, unref, computed } from "vue"
import { ElSwitch } from "element-plus"
import { useIcon } from "@/hooks/useIcon"
import { useAppStore } from "@/store/modules/app"

const app = useAppStore()

const activeIcon = useIcon({
  icon: "radix-icons:moon",
  size: 16,
  color: "#fde047",
  hoverColor: "#fde047"
})

const inactiveIcon = useIcon({
  icon: "ph:sun-fill",
  size: 16,
  color: "#fde047",
  hoverColor: "#fde047"
})
const isDark = ref(app.getIsDark)

const themeChange = (val: boolean) => {
  app.setIsDark(val)
}

const blackColor = "var(--theme-color)"
const themeColor = "var(--theme-bg-black-1)"
const borderColor = computed(() => {
  return unref(isDark) ? "var(--theme-bg-black-1)" : "var(--theme-color)"
})
</script>
<template>
  <ElSwitch
    v-model="isDark"
    :active-icon="activeIcon"
    :inactive-icon="inactiveIcon"
    inline-prompt
    @change="themeChange"
    :style="`--el-switch-on-color: ${themeColor};--el-switch-off-color: ${blackColor};--el-switch-border-color: ${borderColor}`"
  />
</template>
