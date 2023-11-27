// 修改全局变量方法
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
// 将驼峰css变量转换为普通格式css变量 例如：elPrimaryColor --> --el-primary-color
export const toCssVariable = (variable: string) => {
  return `--${variable.replace(/[A-Z]/g, "-$&").toLowerCase()}`
}
