import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { cdn } from "./cdn"

export const getPluginsList = (VITE_CDN: boolean) => {
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    VITE_CDN ? cdn : null
  ]
}
