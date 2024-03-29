import type { StructureConfig } from "@/components/StructureTypes"

export const useStructure = (structure: StructureConfig[]) => {
  if (!structure.length) return

  const formItems = structure.map((config: StructureConfig) => {
    return {
      field: config.field,
      label: config.label,
      ...config.formConfig
    }
  })

  const tableColumns = structure.map((config: StructureConfig) => {
    return {
      field: config.field,
      label: config.label,
      ...config.tableConfig
    }
  })
  return {
    formItems,
    tableColumns
  }
}
