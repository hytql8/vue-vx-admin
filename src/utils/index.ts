// 修改全局变量方法
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
// 将驼峰css变量转换为普通格式css变量 例如：elPrimaryColor --> --el-primary-color
export const toCssVariable = (variable: string): string => {
  return `--${variable.replace(/[A-Z]/g, "-$&").toLowerCase()}`
}
// 静态资源路径转换（生产环境不生效，暂时弃用）
export const getStaticSource = (sourceUrl: string): string | undefined => {
  // 当前import.meta.url是当前index.ts的路径，需要提取此url src及以前的部分
  const parseUrl = new URL(import.meta.url)

  const baseUrl = parseUrl.origin + parseUrl.pathname.split("/src")[0]

  // 正则表达式匹配规则
  const regex: RegExp = /^(@\/|\.{0,2}\/|[a-zA-Z]+:\/\/).+\.(jpg|jpeg|png|gif)$/

  if (regex.test(sourceUrl)) {
    return new URL(sourceUrl.replace("@/", "src/"), baseUrl).href
  }

  return void 0
}

// 刷新页面
export const reload = () => {
  window.location.reload()
}
