<script lang="tsx">
import { ref, unref, nextTick, computed, defineComponent, PropType, CSSProperties } from "vue"
import { ElTable, ElTableColumn, ElPagination, ElCard, ElEmpty, ElButton, ElImage } from "element-plus"
import type { ElTooltipProps } from "element-plus"
import type { TableColumnParameterTypes, Pagination } from "./types"
import { getSlot } from "@/utils/tsxUtils"
import { get } from "lodash-es"
import { VxIcon } from "@/components/VxIcon"

/**  接受参数详情请见 @type TableParameterTypes */
export default defineComponent({
  name: "VxTable",
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    showOverflowTooltip: {
      type: Boolean,
      default: false
    },
    // 是否展示分页
    pagination: {
      type: Object as PropType<Pagination>,
      default: (): Pagination | undefined => undefined
    },
    // 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否叠加索引
    reserveIndex: {
      type: Boolean,
      default: false
    },
    // 对齐方式
    align: {
      type: String as PropType<string & ("left" | "center" | "right")>,
      default: "left"
    },
    // 表头对齐方式
    headerAlign: {
      type: String as PropType<string & ("left" | "center" | "right")>,
      default: "left"
    },
    // 图片自动预览字段数组
    imagePreview: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    // 视频自动预览字段数组
    videoPreview: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<TableColumnParameterTypes[]>,
      default: () => []
    },
    height: {
      type: [String, Number] as PropType<string | number>
    },
    maxHeight: {
      type: [String, Number] as PropType<string | number>
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<string & ("large" | "default" | "small")>,
      default: "default"
    },
    fit: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    showHeader: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    currentRowKey: {
      type: [String, Number] as PropType<string | number>
    },
    rowClassName: {
      type: [Function, String] as PropType<(row: Recordable, rowIndex: number) => string | string>,
      default: ""
    },
    rowStyle: {
      type: [Function, Object] as PropType<(row: Recordable, rowIndex: number) => Recordable | CSSProperties>,
      default: () => undefined
    },
    cellClassName: {
      type: [Function, String] as PropType<(row: Recordable, column: any, rowIndex: number) => string | string>,
      default: ""
    },
    cellStyle: {
      type: [Function, Object] as PropType<(row: Recordable, column: any, rowIndex: number) => Recordable | CSSProperties>,
      default: () => undefined
    },
    headerRowClassName: {
      type: [Function, String] as PropType<(row: Recordable, rowIndex: number) => string | string>,
      default: ""
    },
    headerRowStyle: {
      type: [Function, Object] as PropType<(row: Recordable, rowIndex: number) => Recordable | CSSProperties>,
      default: () => undefined
    },
    headerCellClassName: {
      type: [Function, String] as PropType<(row: Recordable, column: any, rowIndex: number) => string | string>,
      default: ""
    },
    headerCellStyle: {
      type: [Function, Object] as PropType<(row: Recordable, column: any, rowIndex: number) => Recordable | CSSProperties>,
      default: () => undefined
    },
    rowKey: {
      type: [String, Function] as PropType<string | ((row: any) => string)>,
      default: ""
    },
    emptyText: {
      type: String,
      default: "No Data"
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    expandRowKeys: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    defaultSort: {
      type: Object as PropType<{ prop: string; order: string }>,
      default: () => ({})
    },
    tooltipEffect: {
      type: String as PropType<"dark" | "light">,
      default: "dark"
    },
    tooltipOptions: {
      type: Object as PropType<
        Pick<
          ElTooltipProps,
          | "effect"
          | "enterable"
          | "hideAfter"
          | "offset"
          | "placement"
          | "popperClass"
          | "popperOptions"
          | "showAfter"
          | "showArrow"
        >
      >,
      default: () => ({
        enterable: true,
        placement: "top",
        showArrow: true,
        hideAfter: 200,
        popperOptions: { strategy: "fixed" }
      })
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    sumText: {
      type: String
    },
    summaryMethod: {
      type: Function as PropType<(param: { columns: any[]; data: any[] }) => any[]>,
      default: () => undefined
    },
    spanMethod: {
      type: Function as PropType<(param: { row: any; column: any; rowIndex: number; columnIndex: number }) => any[]>,
      default: () => undefined
    },
    selectOnIndeterminate: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 16
    },
    lazy: {
      type: Boolean,
      default: false
    },
    load: {
      type: Function as PropType<(row: Recordable, treeNode: any, resolve: Function) => void>,
      default: () => undefined
    },
    treeProps: {
      type: Object as PropType<{ hasChildren?: string; children?: string; label?: string }>,
      default: () => ({ hasChildren: "hasChildren", children: "children", label: "label" })
    },
    tableLayout: {
      type: String as PropType<"auto" | "fixed">,
      default: "fixed"
    },
    scrollbarAlwaysOn: {
      type: Boolean,
      default: false
    },
    flexible: {
      type: Boolean,
      default: false
    },
    // 自定义内容
    customContent: {
      type: Boolean,
      default: false
    },
    cardBodyStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    cardBodyClass: {
      type: String as PropType<string>,
      default: ""
    },
    cardWrapStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    cardWrapClass: {
      type: String as PropType<string>,
      default: ""
    }
  },
  emits: ["update:pageSize", "update:currentPage", "register", "refresh"],
  setup(props, { attrs, emit, slots, expose }) {
    const elTableRef = ref<InstanceType<typeof ElTable>>()
    // 注册
    const registerTable = async () => {
      await nextTick()
      const tableRef = unref(elTableRef)
      emit("register", tableRef?.$parent, elTableRef)
    }
    registerTable()

    // 获取参数
    const pageSizeRef = ref(props.pageSize)
    const currentPageRef = ref(props.currentPage)

    const getProps = computed(() => {
      const propsObj = { ...props }
      Object.assign(propsObj, { ...attrs })
      return propsObj
    })
    // 获取绑定值
    const getBindValue = computed(() => {
      const bindValue: Recordable = { ...attrs, ...unref(getProps) }
      delete bindValue.columns
      delete bindValue.data
      delete bindValue.align
      return bindValue
    })
    // 分页
    const pagination = computed(() => {
      return Object.assign(
        {
          small: false,
          background: false,
          pagerCount: 7,
          layout: "sizes, prev, pager, next, jumper, ->, total",
          pageSizes: [10, 20, 30, 40, 50, 100],
          disabled: false,
          hideOnSinglePage: false,
          total: 10
        },
        unref(getProps).pagination
      )
    })
    // 递归table column渲染
    const renderTreeTableColumn = (columnsChildren: TableColumnParameterTypes[]) => {
      const { align, headerAlign, showOverflowTooltip, imagePreview, videoPreview } = unref(getProps)
      return columnsChildren.map(v => {
        if (v.hidden) return null
        const props = { ...v } as any
        if (props.children) delete props.children

        const children = v.children

        const slots = {
          default: (...args: any[]) => {
            const data = args[0]
            let isPreview = false
            isPreview =
              imagePreview.some(item => (item as string) === v.field) || videoPreview.some(item => (item as string) === v.field)

            return children && children.length
              ? renderTreeTableColumn(children)
              : props?.slots?.default
              ? props.slots.default(...args)
              : v?.formatter
              ? v?.formatter?.(data.row, data.column, get(data.row, v.field), data.$index)
              : isPreview
              ? renderPreview(get(data.row, v.field), v.field)
              : get(data.row, v.field)
          }
        }
        if (props?.slots?.header) {
          slots["header"] = (...args: any[]) => props.slots.header(...args)
        }

        // 预览部分渲染
        const renderPreview = (url: string, field: string) => {
          const { imagePreview, videoPreview } = unref(getProps)
          return (
            <div class="flex items-center">
              {imagePreview.includes(field) ? (
                <ElImage src={url} fit="cover" class="w-[100%]" lazy preview-src-list={[url]} preview-teleported />
              ) : videoPreview.includes(field) ? (
                <ElButton
                  type="primary"
                  icon={<VxIcon icon="ep:video-play" />}
                  onClick={() => {
                    console.log("play")
                  }}
                >
                  预览
                </ElButton>
              ) : null}
            </div>
          )
        }
        return (
          <ElTableColumn
            showOverflowTooltip={showOverflowTooltip}
            align={align}
            headerAlign={headerAlign}
            {...props}
            prop={v.field}
          >
            {slots}
          </ElTableColumn>
        )
      })
    }

    // 渲染table column
    const renderTableColumn = (columnsChildren?: TableColumnParameterTypes[]) => {
      const {
        columns,
        // reserveIndex,
        // pageSize,
        // currentPage,
        align,
        headerAlign,
        showOverflowTooltip,
        reserveSelection
        // imagePreview,
        // videoPreview
      } = unref(getProps)

      return (columnsChildren || columns).map(v => {
        if (v.hidden) return null
        if (v.type === "index") {
          return (
            <ElTableColumn
              type="index"
              index={v.index}
              align={v.align || align}
              headerAlign={v.headerAlign || headerAlign}
              label={v.label}
              fixed={v.fixed}
              width="65px"
            ></ElTableColumn>
          )
        } else if (v.type === "selection") {
          return (
            <ElTableColumn
              type="selection"
              reserveSelection={reserveSelection}
              align={align}
              headerAlign={headerAlign}
              selectable={v.selectable}
              width="50"
            ></ElTableColumn>
          )
        } else {
          const props = { ...v } as any
          if (props.children) delete props.children

          const children = v.children

          const slots = {
            default: (...args: any[]) => {
              const data = args[0]

              // let isPreview = false
              // isPreview =
              //   imagePreview.some(item => (item as string) === v.field) || videoPreview.some(item => (item as string) === v.field)

              return children && children.length
                ? renderTreeTableColumn(children)
                : props?.slots?.default
                ? props.slots.default(...args)
                : v?.formatter
                ? v?.formatter?.(data.row, data.column, get(data.row, v.field), data.$index)
                : // : isPreview
                  // ? renderPreview(get(data.row, v.field), v.field)
                  get(data.row, v.field)
            }
          }
          if (props?.slots?.header) {
            slots["header"] = (...args: any[]) => props.slots.header(...args)
          }

          return (
            <ElTableColumn
              showOverflowTooltip={showOverflowTooltip}
              align={align}
              headerAlign={headerAlign}
              {...props}
              prop={v.field}
            >
              {slots}
            </ElTableColumn>
          )
        }
      })
    }

    // 暴露
    expose({
      elTableRef
    })
    // render
    return () => {
      const tableSlots = {}
      if (getSlot(slots, "empty")) {
        tableSlots["empty"] = (...args: any[]) => getSlot(slots, "empty", args)
      }
      if (getSlot(slots, "append")) {
        tableSlots["append"] = (...args: any[]) => getSlot(slots, "append", args)
      }

      return (
        <div v-loading={unref(getProps).loading}>
          {unref(getProps).customContent ? (
            <div class="flex flex-wrap">
              {unref(getProps)?.data?.length ? (
                unref(getProps)?.data.map(item => {
                  const cardSlots = {
                    default: () => {
                      return getSlot(slots, "content", item)
                    }
                  }
                  if (getSlot(slots, "content-header")) {
                    cardSlots["header"] = () => {
                      return getSlot(slots, "content-header", item)
                    }
                  }
                  if (getSlot(slots, "content-footer")) {
                    cardSlots["footer"] = () => {
                      return getSlot(slots, "content-footer", item)
                    }
                  }
                  return (
                    <ElCard
                      shadow="hover"
                      class={unref(getProps).cardWrapClass}
                      style={unref(getProps).cardWrapStyle}
                      bodyClass={unref(getProps).cardBodyClass}
                      bodyStyle={unref(getProps).cardBodyStyle}
                    >
                      {cardSlots}
                    </ElCard>
                  )
                })
              ) : (
                <div class="flex flex-1 justify-center">
                  <ElEmpty description="暂无数据" />
                </div>
              )}
            </div>
          ) : (
            <>
              {/* {unref(getProps).showAction && !unref(getProps).customContent ? (
                <TableActions
                  columns={unref(getProps).columns}
                  onChangSize={changSize}
                  onRefresh={refresh}
                  onConfirm={confirmSetColumn}
                />
              ) : null} */}
              <ElTable ref={elTableRef} data={unref(getProps).data} {...unref(getBindValue)}>
                {{
                  default: () => renderTableColumn(),
                  ...tableSlots
                }}
              </ElTable>
            </>
          )}
          {unref(getProps).pagination ? (
            <ElPagination
              v-model:pageSize={pageSizeRef.value}
              v-model:currentPage={currentPageRef.value}
              class="mt-10px"
              {...unref(pagination)}
            ></ElPagination>
          ) : undefined}
        </div>
      )
    }
  }
})
</script>
<style lang="scss" scoped></style>
