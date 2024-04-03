import { TableColumnParameterTypes } from "@/components/Table/src/types"
import { FormSchema } from "@/components/Form"

type TableColumnConfig = Omit<TableColumnParameterTypes, "field" | "label">
type FormItemConfig = Omit<FormSchema, "field" | "label">

/**
 * @description 构造表格表单的配置数据类型 tableConfig formConfig需要必传，如果不需要form table同时显示，则无需用此数据结构
 * @param field 表格/表单的绑定的数据key
 * @param label 表头/表单标题 文字
 * @param tableConfig table配置
 * @param formConfig form 配置
 */
type StructureConfig = {
  field: string
  label?: string
  tableConfig: TableColumnConfig
  formConfig: FormItemConfig
  [key: string]: any
}

export type { StructureConfig }
