<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core"
import { ElButton } from "element-plus"

const isDark = useDark({
  storageKey: "isDark"
})

const toggleDark = useToggle(isDark)
</script>

<template>
  <ElButton @click="toggleDark()">
    <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

    <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
  </ElButton>
</template>
