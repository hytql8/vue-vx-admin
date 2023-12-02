<script lang="tsx" setup>
import { computed } from "vue"
import { useAppStore } from "@/store/modules/app"

defineOptions({
  name: "VxMenu"
})

const appStore = useAppStore()

const layout = computed(() => appStore.getLayout)
console.log(layout)
</script>
<template>
  <div>{{ layout }}</div>
</template>
