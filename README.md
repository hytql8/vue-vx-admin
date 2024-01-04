# VXAdmin

A practical front-end template for Vue3+TypeScript+Vite+Pinia+Vueuse, based on the latest/cutting-edge front-end technologies

# VSCode setting（复制下面就可以，必须要，因为这个是stylelint和I18n Ally插件生效的关键配置）

{
"cSpell.words": [
"Backtop",
"consola",
"iconify",
"iconoir",
"jridgewell",
"mingcute",
"pinia",
"Popconfirm",
"stylelint",
"unplugin",
"unref",
"VITE",
"vueuse",
"vxadmin"
],
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
"source.fixAll.stylelint": true
},
"stylelint.enable": true,
"stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass", "html"], // 指定语言包文件所在目录的路径
"i18n-ally.localesPaths": "src/locales/lang", // 指定语言包中键名的格式
"i18n-ally.keystyle": "nested", // 指定是否按字母顺序对键名进行排序。
"i18n-ally.sortKeys": true, // 指定是否在键名前加上命名空间前缀。
"i18n-ally.namespace": true, // 指定可用的语言包解析器类型。
"i18n-ally.enabledParsers": ["js", "ts"], // 指定源语言的语言代码。
"i18n-ally.sourceLanguage": "en", // 指定显示语言的语言代码。
"i18n-ally.displayLanguage": "cn", // 指定支持的框架类型，默认值包括 "vue"，即支持 Vue.js 框架。
"i18n-ally.enabledFrameworks": ["vue"]
}
