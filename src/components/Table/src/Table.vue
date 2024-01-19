<script lang="ts" setup>
import type { TableParameterTypes } from "./types"
defineOptions({
  name: "VxTable"
})

const props = withDefaults(defineProps<TableParameterTypes>(), {
  data: () => [],
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false
})
</script>
<template>
  <div>Table</div>
</template>
<style lang="scss" scoped></style>
