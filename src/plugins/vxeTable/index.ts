import type { App } from "vue"
import { i18n } from "@/plugins/vueI18n"
import VXETable from "vxe-table"

export function setupVxeTable(app: App) {
  VXETable.config({
    i18n: (key, args) => i18n.global.t(key, args)
  })
  app.use(VXETable)
}
