**VxAdmin**

项目git hub地址

```markdown
https://github.com/hytql8/VXAdmin.git
```

克隆项目

```markdown
git clone https://github.com/hytql8/VXAdmin.git
```

拉取代码之后安装node_modules依赖

```markdown
pnpm i
```

开发环境运行

```markdown
pnpm run dev
```

代码打包

```markdown
pnpm run build
```

代码部署/发布之前预览打包后的页面

```markdown
pnpm run preview
```

代码预览地址

[预览](http://www.hytql8.top/)

vscode所需插件

```markdown
1. Chinese （vscode中文语言） 建议必装
2. DotENV （.env环境变量高亮） 建议必装
3. ESLint (eslint 代码检查提示插件) 建议必装
4. GitLens （查看git提交记录） 
5. i18n Ally (国际化vscode内代码块翻译插件)
6. Iconify IntelliSense （vscode内显示对应代码块为iconify图标）
7. Prettier - Code formatter (代码格式化插件prettier) 建议必装
8. Stylelint （stylelint格式化插件，vscode内对css格式自动排版，查错）建议必装
9. Vue Language Features (Volar) （vue3 代码高亮，语法检查） 建议必装
10. TypeScript Vue Plugin (Volar) （vue3 + ts 代码高亮，语法检查） 建议必装
```

vscode 配置 (项目下的.vscode文件夹下的.settings.json，如果没有就新建一个)

```json
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
    "source.fixAll.stylelint": "explicit"
  },
  "stylelint.enable": true,
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass", "html"],
  "i18n-ally.localesPaths": "src/locales/lang", // 指定语言包文件所在目录的路径
  "i18n-ally.keystyle": "nested", // 指定语言包中键名的格式
  "i18n-ally.sortKeys": true, // 指定是否按字母顺序对键名进行排序。
  "i18n-ally.namespace": true, // 指定是否在键名前加上命名空间前缀。
  "i18n-ally.enabledParsers": ["js", "ts"], // 指定可用的语言包解析器类型。
  "i18n-ally.sourceLanguage": "en", // 指定源语言的语言代码。
  "i18n-ally.displayLanguage": "cn", // 指定显示语言的语言代码。
  "i18n-ally.enabledFrameworks": ["vue"] // 指定支持的框架类型，默认值包括 "vue"，即支持 Vue.js 框架。
}

```

项目图片预览

![](http://hytql8.top/vx-admin-preview.png)

项目还在开发中🔨同时也是自己学习前端中✊后续会继续更新
