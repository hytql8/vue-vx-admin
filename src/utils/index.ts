// 修改全局变量方法
export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
