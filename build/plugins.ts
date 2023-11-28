import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { cdn } from "./cdn"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

export const getPluginsList = (VITE_CDN: boolean) => {
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null,
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ],
      dts: "types/components.d.ts"
    })
  ]
}
