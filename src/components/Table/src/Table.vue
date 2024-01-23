<script lang="tsx" setup>
import { ref, unref, nextTick, computed } from "vue"
import { ElTable, ElTableColumn } from "element-plus"
import type { TableParameterTypes } from "./types"
import { table } from "console"
defineOptions({
  name: "VxTable"
})

const props = withDefaults(defineProps<TableParameterTypes>(), {
  data: () => [],
  columns: () => [],
  stripe: false,
  border: false,
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: "No Data",
  defaultExpandAll: false,
  cellClassName: "123",
  tooltipEffect: "dark",
  tooltipOptions: () => ({
    enterable: true,
    placement: "top",
    showArrow: true,
    hideAfter: 200,
    popperOptions: { strategy: "fixed" }
  }),
  showSummary: false,
  sumText: "Sum",
  selectOnIndeterminate: false,
  indent: 16,
  treeProps: () => ({ hasChildren: "hasChildren", children: "children" }),
  tableLayout: "fixed",
  scrollbarAlwaysOn: false,
  flexible: false
})

const vxTableRef = ref<HTMLElement>(null)
const elTableRef = ref<InstanceType<typeof ElTable>>()

const data = computed(() => props.data)
const columns = computed(() => props.columns)
</script>
<template>
  <div>Searchform</div>
  <div>
    <ElTable :data="data">
      <ElTableColumn v-for="v in columns" :key="v.id" :field="field" :label="label" :prop="prop" :width="width"></ElTableColumn>
    </ElTable>
  </div>
  <div>pagenation</div>
</template>
<style lang="scss" scoped></style>
