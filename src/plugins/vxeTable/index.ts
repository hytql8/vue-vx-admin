import type { App } from "vue"
import { i18n } from "@/plugins/vueI18n"
import VXETable from "vxe-table"
export function setupVxeTable(app: App) {
  VXETable.config({
    // @ts-expect-error 详情请见https://vxetable.cn/#/table/start/i18n
    i18n: (key, args) => i18n.global.t(key, args)
  })
  app.use(VXETable)
}
