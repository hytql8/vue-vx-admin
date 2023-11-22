import { Plugin as importToCDN } from "vite-plugin-cdn-import"

export const cdn = importToCDN({
  //（prodUrl解释： name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
  prodUrl: "https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}",
  modules: [
    {
      name: "vue",
      var: "Vue",
      path: "vue.global.prod.min.js"
    },
    {
      name: "vue-router",
      var: "VueRouter",
      path: "vue-router.global.min.js"
    },
    // {
    //   name: "vue-i18n",
    //   var: "VueI18n",
    //   path: "vue-i18n.runtime.global.prod.min.js"
    // },
    {
      name: "pinia",
      var: "Pinia",
      path: "pinia.iife.min.js"
    }
    // {
    //   name: "element-plus",
    //   var: "ElementPlus",
    //   path: "index.full.min.js",
    //   css: "index.min.css"
    // },
    // {
    //   name: "axios",
    //   var: "axios",
    //   path: "axios.min.js"
    // }
  ]
})
