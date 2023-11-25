<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core"
import { ElButton } from "element-plus"
import { VXIcon } from "@/components/VXIcon"
import { ref } from "vue"

const isDark = useDark({
  storageKey: "isDark"
})

const hoverColor = ref("#333333")

setTimeout(() => {
  hoverColor.value = "red"
  console.log(hoverColor)
}, 5000)

const toggleDark = useToggle(isDark)
</script>

<template>
  <ElButton @click="toggleDark()" type="primary">
    <VXIcon icon="line-md:account-alert" color="#999999" :size="14" :hover-color="hoverColor" />

    <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
  </ElButton>
</template>
