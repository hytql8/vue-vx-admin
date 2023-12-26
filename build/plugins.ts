import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { resolve } from "path"
import { cdn } from "./cdn"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { createStyleImportPlugin, ElementPlusResolve } from "vite-plugin-style-import"

export const getPluginsList = (VITE_CDN: boolean) => {
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null,
    // 自动导入组件对应样式
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: name => {
            if (name === "click-outside") {
              return ""
            }
            return `element-plus/es/components/${name.replace(/^el-/, "")}/style/css`
          }
        }
      ]
    }),
    // 自动注册element plus
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
    })
  ]
}
