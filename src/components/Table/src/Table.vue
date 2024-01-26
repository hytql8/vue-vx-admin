<script lang="tsx" setup>
import { ref, unref, nextTick, computed, toRaw, useAttrs } from "vue"
import { ElTable, ElTableColumn } from "element-plus"
import type { TableParameterTypes } from "./types"
import { getSlot } from "@/utils/tsxUtils"
import { omit } from "lodash-es"

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
const elTableColumnRef = ref<InstanceType<typeof ElTableColumn>>()

const data = computed(() => props.data)
const columns = computed(() => props.columns)
const border = computed(() => props.border)
// 获取父组件传递来的所有attrs，属性props无方法，attrs为所有参数，包括方法
const attrs = useAttrs()
const mergeAttrs = Object.assign(omit(attrs, ["data", "border"]), { data: unref(data), border: unref(border) })
const VxTableDom = (
  <>
    <ElTable {...unref(mergeAttrs)}>
      <slot />
      {unref(columns).map(v => {
        return v.type ? (
          <>
            <ElTableColumn {...v} />
          </>
        ) : (
          <ElTableColumn {...v}>
            {v.slots
              ? Object.keys(v.slots).forEach(slot => {
                  console.log(slot)
                  return (
                    <template slot={slot} key={slot}>
                      {v.slots[slot]()}
                    </template>
                  )
                })
              : void 0}
          </ElTableColumn>
        )
      })}
    </ElTable>
  </>
)

const VxTable = () => VxTableDom
</script>
<template>
  <VxTable />
</template>
<!-- <template>
  <div>Searchform待展示</div>
  <div>
    v-bind="$attrs" 可以将vxTable组件身上的事件透传到ElTable上(父组件传入且未定义为props的属性可以透传)
    <ElTable ref="elTableRef" v-bind="$attrs" :data="data" :border="border" :row-key="rowKey">
      默认插槽
      <slot />
      <template v-for="v in columns" :key="v.field || v.label">
        selection || radio || index || expand || sort
        <ElTableColumn v-if="v.type && v.type == 'selection'" type="selection" v-bind="v"> </ElTableColumn>
        <ElTableColumn v-else-if="v.type && v.type == 'index'" type="index" v-bind="v"> </ElTableColumn>
        普通列
        <ElTableColumn v-else v-bind="v">
          <template v-for="slot in v.slots" #[slot]="scope"> <slot :name="slot" v-bind="scope" /> </template>
        </ElTableColumn>
      </template>
    </ElTable>
  </div>
  <div>pagenation待展示</div>
</template> -->
<style lang="scss" scoped></style>
