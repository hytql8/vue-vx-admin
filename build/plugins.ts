import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import { cdn } from "./cdn"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { visualizer } from "rollup-plugin-visualizer"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { createStyleImportPlugin, ElementPlusResolve, VxeTableResolve } from "vite-plugin-style-import"
import { viteMockServe, ViteMockOptions } from "vite-plugin-mock"
import { configCompressPlugin } from "./compress"

export const getPluginsList = (VITE_CDN: boolean, VITE_REPORT: boolean, VITE_COMPRESSION: ViteCompression) => {
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null,
    // 自动导入组件对应样式
    createStyleImportPlugin({
      resolves: [ElementPlusResolve(), VxeTableResolve()]
    }),
    // 自动导入element plus
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "types/components.d.ts"
    }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("locales/**")]
    }),
    viteMockServe({
      ignore: /^\_/,
      mockPath: "mock",
      localEnabled: true,
      prodEnabled: true,
      injectCode: `import { setupProdMockServer } from '../mock/_createProductionServer'
      setupProdMockServer()`
    } as ViteMockOptions),
    process.env.npm_lifecycle_event === "build" && VITE_REPORT
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : null,
    configCompressPlugin(VITE_COMPRESSION)
  ]
}
