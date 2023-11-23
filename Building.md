**VXAdmin** (vite需要node.js >= 14.18)

1.vite安装

```markdown
pnpm create vite
```

2.准备的项目规范

```markdown
1. 组件（包括文件夹）命名使用大驼峰
2. 组件，功能入口文件均为index.ts
3. 公共组件放在components目录下
4. hooks文件夹放不同类型的hooks函数，utils放公共函数
5. 所有请求接口放在api文件夹下，api下子文件夹和views一一对应
```

3.项目结构

```markdown
├── public
│   └──
```

4.安装@node/types

```markdown
pnpm i @types/node --save-dev
```

5.安装eslint

```markdown
pnpm i eslint --save-dev
```

6.安装prettier

```markdown
pnpm add --save-dev --save-exact prettier
```

7.安装@typescript-eslint/parser

```mark
pnpm i @typescript-eslint/parser --save-dev
```

8.安装@typescript-eslint/eslint-plugin

```mark
pnpm i @typescript-eslint/eslint-plugin --save-dev
```

9.安装eslint-config-prettier

```mark
pnpm i eslint-config-prettier --save-dev
```

10.安装eslint-plugin-prettier

```mark
pnpm i eslint-plugin-prettier --save-dev
```

11.安装eslint-plugin-vue（eslint只能对js文件校验，用此插件让eslint对vue文件进行校验）

```mark
pnpm i eslint-plugin-vue --save-dev
```

12.安装stylelint

```mark
pnpm i stylelint --save-dev
```

13.安装stylelint-config-html

```mark
pnpm i stylelint-config-html --save-dev
```

14.安装stylelint-config-recess-order

```mark
pnpm i stylelint-config-recess-order --save-dev
```

15.安装stylelint-config-recommended

```mark
pnpm i stylelint-config-recommended --save-dev
```

16.安装stylelint-config-recommended-scss

```mark
pnpm i stylelint-config-recommended-scss --save-dev
```

17.安装stylelint-config-recommended-vue

```mark
pnpm i stylelint-config-recommended-vue --save-dev
```

18.安装stylelint-config-standard

```mark
pnpm i stylelint-config-standard --save-dev
```

19.安装stylelint-config-standard-scss

```mark
pnpm i stylelint-config-standard-scss --save-dev
```

20.安装stylelint-order

```mark
pnpm i stylelint-order --save-dev
```

21.安装stylelint-prettier

```mark
pnpm i stylelint-prettier --save-dev
```

22.安装stylelint-scss

```mark
pnpm i stylelint-scss --save-dev
```

23.安装sass

```mark
pnpm i sass --save-dev
```

24.安装 jsx依赖

```mark
pnpm install @vitejs/plugin-vue-jsx --save-dev
```

接下来是生产环境的依赖

25.安装pinia（状态管理）

```mark
pnpm install pinia
```

26.安装vue-router

```mark
pnpm install vue-router@4
```

27.安装vue hooks库 vueuse

```mark
pnpm i @vueuse/core
```

28.安装 vite-plugin-cdn-import （开启打包之后cdn加载）

```mark
pnpm install vite-plugin-cdn-import
```

29.安装axios

```mark
pnpm install axios
```

30.安装element plus

```mark
pnpm install element-plus
```

