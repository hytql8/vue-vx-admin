import type {
  ElTooltipProps,
  ElTable,
  ElTableColumn,
  ColumnCls,
  ColumnStyle,
  CellCls,
  CellStyle,
  SummaryMethod
} from "element-plus"
import { VxIcon } from "@/components/VxIcon"

type ElTablePropsType = InstanceType<typeof ElTable> extends { $props: infer P } ? P : never
type ElTableColumnPropsType = InstanceType<typeof ElTableColumn> extends { $props: infer P } ? P : never

/**
 * @description Table的参数的类型
 * @param data 显示的数据
 * @param columns 渲染的列配置
 * @param pagination 是否显示分页
 * @param loading 是否展示加载中动画
 * @param height Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param stripe 是否为斑马纹 table
 * @param border 是否带有纵向边框
 * @param size Table 的尺寸
 * @param fit 列的宽度是否自撑开
 * @param showHeader 是否显示表头
 * @param highlightCurrentRow 是否要高亮当前行
 * @param currentRowKey 当前行的 key，只写属性
 * @param rowClassName 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
 * @param rowStyle 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
 * @param cellClassName 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
 * @param cellStyle 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
 * @param headerRowClassName 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
 * @param headerRowStyle 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
 * @param headerCellClassName 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
 * @param headerCellStyle 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
 * @param rowKey 行数据的 Key，用来优化 Table 的渲染； 在使用reserve-selection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
 * @param emptyText 空数据时显示的文本内容， 也可以通过 #empty 设置
 * @param defaultExpandAll 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
 * @param expandRowKeys 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
 * @param defaultSort 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序。(如果 prop 被设置, 且 order 没有设置, 那么 order 默认为 ascending)
 * @param tooltipEffect 溢出的 tooltip 的 effect
 * @param tooltipOptions  溢出 tooltip 的选项
 * @param showSummary 是否在表尾显示合计行
 * @param sumText 显示摘要行第一列的文本
 * @param summaryMethod 自定义的合计计算方法
 * @param spanMethod 合并行或列的计算方法
 * @param selectOnIndeterminate 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行
 * @param indent 展示树形数据时，树节点的缩进
 * @param lazy 是否懒加载子节点数据
 * @param load 加载子节点数据的函数，lazy 为 true 时生效
 * @param treeProps 渲染嵌套数据的配置选项
 * @param tableLayout 设置表格单元、行和列的布局方式
 * @param scrollbarAlwaysOn 总是显示滚动条
 * @param showOverflowTooltip 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示。
 * @param flexible 确保主轴的最小尺寸，以便不超过内容
 */
interface TableParameterTypes extends /* @vue-ignore */ ElTablePropsType {
  data?: Recordable[]
  columns?: TableColumnParameterTypes[]
  pagination?: Pagination | undefined
  loading?: boolean
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: string & ("large" | "default" | "small")
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  rowClassName?: ColumnCls<any>
  rowStyle?: ColumnStyle<any>
  cellClassName?: CellCls<any>
  cellStyle?: CellStyle<any>
  headerRowClassName?: ColumnCls<any>
  headerRowStyle?: ColumnStyle<any>
  headerCellClassName?: CellCls<any>
  headerCellStyle?: CellStyle<any>
  rowKey?: string | ((row: any) => string)
  emptyText?: string
  defaultExpandAll?: boolean
  expandRowKeys?: Recordable[]
  defaultSort?: Recordable & {
    order: "ascending" | "descending"
    prop: string
  }
  tooltipEffect?: string & ("dark" | "light")
  tooltipOptions?: Partial<
    Pick<
      ElTooltipProps,
      "effect" | "enterable" | "hideAfter" | "offset" | "placement" | "popperClass" | "popperOptions" | "showAfter" | "showArrow"
    >
  >
  showSummary?: boolean
  sumText?: string
  summaryMethod?: SummaryMethod<any>
  spanMethod?: ({ row, column, rowIndex, columnIndex }) => number[] | { rowspan: number; colspan: number }
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  load?: (row: Recordable, treeNode: any, resolve: Function) => void
  treeProps?: Recordable
  tableLayout?: string & ("fixed" | "auto")
  scrollbarAlwaysOn?: boolean
  showOverflowTooltip?: boolean | [object]
  flexible?: boolean
  [key: string]: any
}

/**
 * @description TableColumn的参数的类型
 * @param field 对应绑定data的字段名 替换文档中prop
 * @param label 显示的标题
 * @param type 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮
 * @param index 如果设置了 type=index，可以通过传递 index 属性来自定义索引
 * @param columnKey column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
 * @param width 对应列的宽度
 * @param minWidth 对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
 * @param fixed 列是否固定在左侧或者右侧。 true 表示固定在左侧
 * @param renderHeader 列标题 Label 区域渲染使用的 Function
//  * @param sortable 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
 * @param sortBy 	指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
 * @param sortOrders 	数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序
 * @param resizable 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
 * @param formatter 用来格式化内容
 * @param showOverflowTooltip 当内容过长被隐藏时显示 tooltip
 * @param align 对齐方式
 * @param headerAlign 表头对齐方式， 若不设置该项，则使用表格的对齐方式
 * @param className 列的 className
 * @param labelClassName 当前列标题的自定义类名
 * @param selectable 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
 * @param reserveSelection 数据刷新后是否保留选项，仅对  type=selection 的列有效， 请注意， 需指定 row-key 来让这个功能生效。
 * @param filters 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。
 * @param filterPlacement 过滤弹出框的定位
 * @param filterClassName 过滤弹出框的 className
 * @param filterMultiple 数据过滤的选项是否多选
 * @param filterMethod 数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
 * @param filteredValue 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。
 */
interface TableColumnParameterTypes extends ElTableColumnPropsType {
  field?: string
  label?: string
  type?: string
  hidden?: boolean
  children?: TableColumnParameterTypes[]
  slots?: {
    default?: (...args: any[]) => null
    header?: (...args: any[]) => null
  }
  index?: number | ((index: number) => number)
  columnKey?: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | "left" | "right"
  renderHeader?: (...args: any[]) => null
  sortMethod?: (...args: any[]) => number
  sortBy?: string | string[] | ((row: any, index: number) => string)
  sortOrders?: ("ascending" | "descending")[]
  resizable?: boolean
  formatter?: (...args: any[]) => any
  showOverflowTooltip?: boolean
  align?: "left" | "center" | "right"
  headerAlign?: "left" | "center" | "right"
  className?: string
  labelClassName?: string
  selectable?: (...args: any[]) => boolean
  reserveSelection?: boolean
  filters?: Array<{ text: string; value: string }>
  filterPlacement?: string
  filterClassName?: string
  filterMultiple?: boolean
  filterMethod?: (...args: any[]) => boolean
  filteredValue?: string[]
  [key: string]: any
}

/**
 * @description 分页参数类型
 * @param small 是否使用小型分页样式
 * @param background 是否为分页按钮添加背景色
 * @param pageSize 每页显示条目个数
 * @param defaultPageSize 每页默认的条目个数，不设置时默认为10
 * @param total 总条目数
 * @param pageCount 总页数， total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
 * @param pagerCount 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠
 * @param currentPage 当前页数
 * @param defaultCurrentPage 当前页数的默认初始值，不设置时默认为 1
 * @param layout 组件布局，子组件名用逗号分隔
 * @param pageSizes 每页显示个数选择器的选项设置
 * @param popperClass 每页显示个数选择器的下拉框类名
 * @param prevText 替代图标显示的上一页文字
 * @param prevIcon 上一页的图标， 比 prev-text 优先级更高
 * @param nextText 替代图标显示的下一页文字
 * @param prevIcon 下一页的图标， 比 next-text 优先级更低
 * @param disabled 是否禁用分页
 * @param teleported 是否将下拉菜单teleport至 body
 * @param hideOnSinglePage 	只有一页时是否隐藏
 */
interface Pagination {
  small?: boolean
  background?: boolean
  pageSize?: number
  defaultPageSize?: number
  total?: number
  pageCount?: number
  pagerCount?: number
  currentPage?: number
  defaultCurrentPage?: number
  layout?: string
  pageSizes?: number[]
  popperClass?: string
  prevText?: string
  prevIcon?: string | InstanceType<typeof VxIcon>
  nextText?: string
  nextIcon?: string | InstanceType<typeof VxIcon>
  disabled?: boolean
  teleported?: boolean
  hideOnSinglePage?: boolean
}
// 设置table的参数类型
interface TableSetProps {
  field: string
  path: string
  value: any
}

// 暴露方法的类型
interface TableExpose {
  setProps: (props: Recordable) => void
  setColumn: (columnProps: TableSetProps[]) => void
  addColumn: (column: TableColumnParameterTypes, index?: number) => void
  delColumn: (field: string) => void
  elTableRef: InstanceType<typeof ElTable>
}

export type { TableParameterTypes, TableColumnParameterTypes, Pagination, TableSetProps, TableExpose }
