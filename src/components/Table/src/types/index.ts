/**
 * @description Table的参数的类型
 * @param data 显示的数据
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
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 * @param maxHeight Table 的最大高度。 合法的值为数字或者单位为 px 的高度。
 *
 */
interface TableParameterTypes {
  data?: Recordable[]
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: string & ("large" | "default" | "small")
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  rowClassName?: string | (({ row, rowIndex }) => any)
  rowStyle?: Recordable | (({ row, rowIndex }) => any)
  cellClassName?: string | (({ row, column, rowIndex, columnIndex }) => any)
  cellStyle?: Recordable | (({ row, column, rowIndex, columnIndex }) => any)
}

export type { TableParameterTypes }
