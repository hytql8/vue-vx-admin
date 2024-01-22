<script lang="tsx" setup>
import { ref, unref, nextTick } from "vue"
import { ElTable, ElTableColumn } from "element-plus"
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

const getVxTableRef = async () => {
  await nextTick()
  return unref(vxTableRef)
}

const getElTableRef = async () => {
  await nextTick()
  return unref(elTableRef)
}

const VxTable = () => {
  const JsxDom = (
    <>
      <ElTable ref="elTable" data={props.data}>
        {{
          default: () => {
            return (
              <>
                <ElTableColumn></ElTableColumn>
              </>
            )
          }
        }}
      </ElTable>
    </>
  )
  return JsxDom
}
</script>
<template>
  <div>
    <VxTable ref="vxTable" />
  </div>
</template>
<style lang="scss" scoped></style>
