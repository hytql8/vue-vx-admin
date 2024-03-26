import { resolve } from "path"
import { loadEnv } from "vite"
import { readEnv } from "./build/index"
import type { UserConfig, ConfigEnv } from "vite"
import { getPluginsList } from "./build/plugins"

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(root, ".", dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
}

export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_CDN, VITE_PUBLIC_PATH } = readEnv(loadEnv(mode, root))
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: getPluginsList(VITE_CDN),
    // 解决路径
    resolve: {
      alias
    },
    // vue 3.4去除控制台warning
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true"
    },
    // css配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    // 打包
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告 默认500kb 这里改为4000kb
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    // 服务
    server: {
      port: VITE_PORT,
      proxy: {},
      hmr: {
        overlay: false
      },
      host: "0.0.0.0"
    },
    // 预构建 include构建 exclude排除
    optimizeDeps: {
      include: [
        "vue",
        "pinia",
        "vue-i18n",
        "vue-router",
        "@vueuse/core",
        "element-plus/es/locale/lang/zh-cn",
        "element-plus/es/locale/lang/en",
        "axios",
        "echarts",
        "vxe-table",
        "lodash-es"
      ],
      exclude: ["@iconify-icons/ep", "@iconify-icons/ri", "@iconify/vue"]
    }
  }
}
